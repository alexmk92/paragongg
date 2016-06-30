<?php

namespace App\Jobs;

use App\Hero;
use GuzzleHttp\Client;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UpdateHeroImage extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $object;

    /**
     * Create a new job instance.
     *
     * @param $object
     */
    public function __construct($object)
    {
        $this->object = $object;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $client = new Client();
        $storage = Storage::disk('s3');
        $hero = Hero::where('code', $this->object->id)->first();

        if (!$hero) return true;

        $heroDetails = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/hero/' . $this->object->id, [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $heroDetails = json_decode($heroDetails);

        $filename = explode('/', $heroDetails->images->icon);
        $filename = end($filename);
        $filename = pathinfo($filename, PATHINFO_FILENAME);

        if(!$hero->image || $hero->image != $filename) {
            // If an old image exists, delete the directory
            if($hero->image) $storage->deleteDirectory('images/heroes/'.$this->object->id.'/'.$filename);

            // Create 3 sizes for the hero portrait
            $portrait_large  = Image::make('http:' . $heroDetails->images->icon)->stream()->getContents();
            $portrait_medium = Image::make($portrait_large)->resize(256,256)->stream()->getContents();
            $portrait_small  = Image::make($portrait_large)->resize(128,128)->stream()->getContents();

            // Upload these to S3
            $storage->getDriver()->put('images/heroes/' . $this->object->id . '/'.$filename.'/portrait_large.png', $portrait_large, ["CacheControl" => "max-age=31536000"]);
            $storage->getDriver()->put('images/heroes/' . $this->object->id . '/'.$filename.'/portrait_medium.png', $portrait_medium, ["CacheControl" => "max-age=31536000"]);
            $storage->getDriver()->put('images/heroes/' . $this->object->id . '/'.$filename.'/portrait_small.png', $portrait_small, ["CacheControl" => "max-age=31536000"]);

            // Update the hero model with the new filename
            $hero->image = $filename;
            $hero->save();
        }
    }
}
