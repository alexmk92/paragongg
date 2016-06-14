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
    }
}
