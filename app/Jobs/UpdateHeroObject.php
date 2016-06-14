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
        $hero->slug       = strtolower($hero->name);
        $hero->affinities = $heroDetails->affinities;
        $hero->type       = $heroDetails->type;
        $hero->role       = $heroDetails->role;
        $hero->attack     = $heroDetails->attack;
        $hero->scale      = $heroDetails->scale;
        $hero->stats      = $heroDetails->stats;
        $hero->abilities  = $heroDetails->abilities;
        $hero->save();
    }
}
