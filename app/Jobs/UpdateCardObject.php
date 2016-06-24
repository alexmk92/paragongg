<?php

namespace App\Jobs;

use App\Card;
use GuzzleHttp\Client;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UpdateCardObject extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels, DispatchesJobs;

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
        $card = Card::where('code', $this->object->id)->first();

        if (!$card) {
            Card::create(['name' => $this->object->name, 'code' => $this->object->id]);
            $this->dispatch(new UpdateCardImage($this->object));
        } else {
            // Check background image
            $filename_background = explode('/', $this->object->images->large);
            $filename_background = end($filename_background);
            $filename_background = pathinfo($filename_background, PATHINFO_FILENAME);

            $filename_icon = explode('/', $this->object->images->icon);
            $filename_icon = end($filename_icon);
            $filename_icon = pathinfo($filename_icon, PATHINFO_FILENAME);

            if(!$card->background || $card->background != $filename_background || !$card->icon || $card->icon != $filename_icon) {
                $this->dispatch(new UpdateCardImage($this->object));
            }
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
        $card->slug = createSlug($card->name);
        $card->type = $cardDetails->slotType;
        $card->cost = $cardDetails->cost;
        $card->images = $cardDetails->images;
        $card->upgradeSlots = $cardDetails->upgradeSlots;
        $card->affinity = $cardDetails->affinities[0];
        $card->rarity   = $cardDetails->rarity;
        $card->effects = $cardDetails->effects;
        if($cardDetails->maxedEffects) {
            $card->maxedEffects = $cardDetails->maxedEffects;
        }
        $card->save();
    }
}
