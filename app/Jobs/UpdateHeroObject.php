<?php

namespace App\Jobs;

use App\Hero;
use GuzzleHttp\Client;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UpdateHeroObject extends Job implements ShouldQueue
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
        $storage = Storage::disk('s3');
        $client = new Client();
        $exists = Hero::where('code', $this->object->id)->first();

        if (!$exists) {
            Hero::create(['name' => $this->object->name, 'code' => $this->object->id]);
        }

        $heroDetails = $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/hero/' . $this->object->id, [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $heroDetails = json_decode($heroDetails);

        $hero = Hero::where('code', $this->object->id)->first();
        $hero->slug       = strtolower($hero->name);
        $hero->affinities = $heroDetails->affinities;
        $hero->type       = $heroDetails->type;
        $hero->attack     = $heroDetails->attack;
        $hero->stats      = $heroDetails->stats;
        $hero->abilities  = $heroDetails->abilities;
        $hero->save();

        $portrait_large  = Image::make('http:' . $heroDetails->images->icon)->stream()->getContents();
        $portrait_medium =  Image::make($portrait_large)->resize(256,256)->stream()->getContents();
        $portrait_small =  Image::make($portrait_large)->resize(128,128)->stream()->getContents();

        $storage->getDriver()->put('images/heroes/' . $this->object->id . '/portrait_large.png', $portrait_large, ["CacheControl" => "max-age=86400"]);
        $storage->getDriver()->put('images/heroes/' . $this->object->id . '/portrait_medium.png', $portrait_medium, ["CacheControl" => "max-age=86400"]);
        $storage->getDriver()->put('images/heroes/' . $this->object->id . '/portrait_small.png', $portrait_small, ["CacheControl" => "max-age=86400"]);
    }
}
