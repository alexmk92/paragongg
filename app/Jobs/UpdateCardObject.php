<?php

namespace App\Jobs;

use App\Card;
use GuzzleHttp\Client;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UpdateCardObject extends Job implements ShouldQueue
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
        $exists = Card::where('code', $this->object->id)->first();

        if (!$exists) {
            Card::create(['name' => $this->object->name, 'code' => $this->object->id]);
            $this->updateImages = true;
        }

        $cardDetails = $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/' . $this->object->id, [
            'headers' => [
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $cardDetails = json_decode($cardDetails);

        $card = Card::where('code', $this->object->id)->first();
        $card->description = $cardDetails->description;
        $card->type = $cardDetails->type;
        $card->cost = $cardDetails->cost;
        $card->upgradeSlots = $cardDetails->upgradeSlots;
        $card->affinity = $cardDetails->affinity;
        $card->effects = $cardDetails->effects;
        $card->save();

        if ($this->updateImages) {

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
}
