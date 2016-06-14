<?php

namespace App\Jobs;

use App\Card;
use GuzzleHttp\Client;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UpdateCardImage extends Job implements ShouldQueue
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
        $exists = Card::where('code', $this->object->id)->first();

        if (!$exists) return true;

        // BACKGROUND
        $background = $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/' . $this->object->id . '/image/background.png', [
            'headers' => [
                'Accept' => 'image/png',
                'Authorization' => 'Bearer ' . APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody()->getContents();

        $background_small = Image::make($background)->resize(150, null, function($constraint) {
            $constraint->aspectRatio();
        })->stream()->getContents();
        $storage->getDriver()->put('images/cards/' . $this->object->id . '/background.png', $background, ["CacheControl" => "max-age=3600"]);
        $storage->getDriver()->put('images/cards/' . $this->object->id . '/background_small.png', $background_small, ["CacheControl" => "max-age=3600"]);

        // ICON
        $icon = $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/' . $this->object->id . '/image/icon.png', [
            'headers' => [
                'Accept' => 'image/png',
                'Authorization' => 'Bearer ' . APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody()->getContents();

        $icon_small =  Image::make($icon)->resize(128,128)->stream()->getContents();
        $icon_medium = Image::make($icon)->resize(256,256)->stream()->getContents();
        $storage->getDriver()->put('images/cards/' . $this->object->id . '/icon.png', $icon, ["CacheControl" => "max-age=3600"]);
        $storage->getDriver()->put('images/cards/' . $this->object->id . '/icon_medium.png', $icon_medium, ["CacheControl" => "max-age=3600"]);
        $storage->getDriver()->put('images/cards/' . $this->object->id . '/icon_small.png', $icon_small, ["CacheControl" => "max-age=3600"]);
    }
}
