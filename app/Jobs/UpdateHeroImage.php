<?php

namespace App\Jobs;

use App\Hero;
use GuzzleHttp\Client;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
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
        $storage = Storage::disk('s3');

        $client = new Client();
        $exists = Hero::where('code', $this->object->id)->first();

        if (!$exists) return true;

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
        $storage->getDriver()->put('images/heroes/' . $this->object->id . '/portrait_small.png', $portrait_small, ["CacheControl" => "max-age=3600"]);
    }
}
