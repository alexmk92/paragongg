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
    protected $updateImages;

    /**
     * Create a new job instance.
     *
     * @param $object
     * @param $updateImages
     */
    public function __construct($object, $updateImages)
    {
        $this->object = $object;
        $this->updateImages = $updateImages;
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
            $this->updateImages = true;
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
        $hero->affinities = $heroDetails->affinities;
        $hero->type       = $heroDetails->type;
        $hero->role       = $heroDetails->role;
        $hero->attack     = $heroDetails->attack;
        $hero->scale      = $heroDetails->scale;
        $hero->stats      = $heroDetails->stats;
        $hero->abilities  = $heroDetails->abilities;
        $hero->save();

        if ($this->updateImages) {

            // BACKGROUND
            $portrait = $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/hero/' . $this->object->id . '/image/mugshot.png', [
                'headers' => [
                    'Accept' => 'image/png',
                    'Authorization' => 'Bearer ' . APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody()->getContents();

            $portrait_medium =  Image::make($portrait)->resize(256,256)->stream()->getContents();
            $portrait_small =  Image::make($portrait)->resize(128,128)->stream()->getContents();
            
            $storage->getDriver()->put('images/heroes/' . $this->object->id . '/portrait.png', $portrait, ["CacheControl" => "max-age=3600"]);
            $storage->getDriver()->put('images/heroes/' . $this->object->id . '/portrait_medium.png', $portrait_medium, ["CacheControl" => "max-age=3600"]);
            $storage->getDriver()->put('images/heroes/' . $this->object->id . '/portrait_medium.png', $portrait_small, ["CacheControl" => "max-age=3600"]);

        }
    }
}
