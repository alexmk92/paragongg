<?php

namespace App\Jobs;

use App\Card;
use GuzzleHttp\Client;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

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
        $client = new Client();
        $exists = Card::where('code', $this->object->id)->first();
        if(!$exists) {

            if (!file_exists('assets/images/cards/'.$this->object->id)) {
                mkdir('assets/images/cards/' . $this->object->id, 0777, true);
            }

            Card::create(['name' => $this->object->name, 'code' => $this->object->id]);

            // BACKGROUND
            $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$this->object->id.'/image/background.png', [
                'headers' => [
                    'Accept'        => 'image/png',
                    'Authorization' => 'Bearer '.APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ],
                'save_to' => 'assets/images/cards/'.$this->object->id.'/background.png'
            ])->getBody();

            // ICON
            $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$this->object->id.'/image/icon.png', [
                'headers' => [
                    'Accept'        => 'image/png',
                    'Authorization' => 'Bearer '.APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ],
                'save_to' => 'assets/images/cards/'.$this->object->id.'/icon.png'
            ])->getBody();

        }

        $cardDetails = $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$this->object->id, [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'Bearer '.APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $cardDetails = json_decode($cardDetails);

        $card = Card::where('code', $this->object->id)->first();
        $card->description  = $cardDetails->description;
        $card->type         = $cardDetails->type;
        $card->cost         = $cardDetails->cost;
        $card->upgradeSlots = $cardDetails->upgradeSlots;
        $card->affinity     = $cardDetails->affinity;
        $card->effects      = $cardDetails->effects;
        $card->save();

        if($this->updateImages) {

            // @TODO make this S3
            if (!file_exists('assets/images/cards/'.$this->object->id)) {
                mkdir('assets/images/cards/' . $this->object->id, 0777, true);
            }
            // BACKGROUND
            $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$this->object->id.'/image/background.png', [
                'headers' => [
                    'Accept'        => 'image/png',
                    'Authorization' => 'Bearer '.APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ],
                'save_to' => 'assets/images/cards/'.$this->object->id.'/background.png'
            ])->getBody();

            // ICON
            $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$this->object->id.'/image/icon.png', [
                'headers' => [
                    'Accept'        => 'image/png',
                    'Authorization' => 'Bearer '.APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ],
                'save_to' => 'assets/images/cards/'.$this->object->id.'/icon.png'
            ])->getBody();

        }
    }
}
