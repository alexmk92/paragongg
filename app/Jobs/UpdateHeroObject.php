<?php

namespace App\Jobs;

use App\Hero;
use GuzzleHttp\Client;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class UpdateHeroObject extends Job implements ShouldQueue
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
        $hero = Hero::where('code', $this->object->id)->first();

        if (!$hero) {
            Hero::create(['name' => $this->object->name, 'code' => $this->object->id]);
            $this->dispatch(new UpdateHeroImage($this->object));
        } else {
            // Save the background image
            $filename = explode('/', $this->object->images->icon);
            $filename = end($filename);
            $filename = pathinfo($filename, PATHINFO_FILENAME);

            if(!$hero->image || $hero->image != $filename) {
                $this->dispatch(new UpdateHeroImage($this->object));
            }
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
        $hero->slug       = createSlug($hero->name);
        $hero->affinities = $heroDetails->affinities;
        $hero->type       = $heroDetails->type;
        $hero->attack     = $heroDetails->attack;
        $hero->stats      = $heroDetails->stats;
        $hero->abilities  = $heroDetails->abilities;
        $hero->save();

    }
}
