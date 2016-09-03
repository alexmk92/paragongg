<?php

namespace App\Jobs;

use App\Card;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Intervention\Image\Exception\NotReadableException;

/**
 * Class UpdateCardObject
 * @package App\Jobs
 */
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
        $card = Card::where('code', $this->object['id'])->first();

        // Update card stats
        if (!$card) {
            $card = Card::create(['name' => $this->object['name'], 'code' => $this->object['id']]);
        }

        $card->name = $this->object['name'];
        $card->slug = createSlug($this->object['name']);
        $card->type = $this->object['slotType'];
        $card->cost = $this->object['cost'];
        $card->images = $this->object['images'];
        $card->upgradeSlots = $this->object['upgradeSlots'];
        $card->affinity = $this->object['affinities'][0];
        $card->rarity   = $this->object['rarity'];
        $card->damageType = $this->object['damageType'];
        if($card->name == "The Archmagus") $card->damageType = 'Energy';
        $card->effects = $this->object['effects'];
        if(isset($this->object['maxedEffects'])) {
            $card->maxedEffects = $this->object['maxedEffects'];
        }
        $card->save();

        $this->getArt($card);
    }

    /**
     * @param Card $card
     */
    public function getArt($card)
    {
        $storage = Storage::disk('s3');

        // Save the background image
        $filename = explode('/', $this->object['images']['large']);
        $filename = end($filename);
        $filename = pathinfo($filename, PATHINFO_FILENAME);

        if(!$card->background || $card->background != $filename) {
            // If an old image exists, delete the directory
            if($card->background) $storage->deleteDirectory('images/cards/'.$this->object['id'].'/'.$filename);

            try {
                $background_large  = Image::make('http:' . $this->object['images']['large'])->stream()->getContents();
            } catch(NotReadableException $exception) {
                Log::info("Couldn't retrieve card art (background) for: ".$card['code']);
                $background_large = Image::make('https://paragon.gg/assets/images/cards/card-placeholder.png')->stream()->getContents();
            }

            $background_medium = Image::make($background_large)->resize(150,200)->stream()->getContents();

            // Upload these to S3
            $storage->getDriver()->put('images/cards/' . $this->object['id'] . '/'.$filename.'/background_large.png', $background_large, ["CacheControl" => "max-age=31536000"]);
            $storage->getDriver()->put('images/cards/' . $this->object['id'] . '/'.$filename.'/background_medium.png', $background_medium, ["CacheControl" => "max-age=31536000"]);

            // Update the card background with the new filename
            $card->background = $filename;
            $card->save();

        }

        // Save the icon
        $filename = explode('/', $this->object['images']['icon']);
        $filename = end($filename);
        $filename = pathinfo($filename, PATHINFO_FILENAME);

        if(!$card->icon || $card->icon != $filename) {
            // If an old image exists, delete the directory
            if($card->icon) $storage->deleteDirectory('images/cards/'.$this->object['id'].'/'.$filename);

            try {
                $icon_large  = Image::make('http:' . $this->object['images']['icon'])->stream()->getContents();
            } catch(NotReadableException $exception) {
                Log::info("Couldn't retrieve card art (icon) for: ".$card->code);
                $icon_large = Image::make('https://paragon.gg/assets/images/cards/card-icon-placeholder.png')->stream()->getContents();
            }

            $icon_medium = Image::make($icon_large)->resize(256,256)->stream()->getContents();
            $icon_small = Image::make($icon_large)->resize(128,128)->stream()->getContents();

            // Upload these to S3
            $storage->getDriver()->put('images/cards/' . $this->object['id'] . '/'.$filename.'/icon_large.png', $icon_large, ["CacheControl" => "max-age=31536000"]);
            $storage->getDriver()->put('images/cards/' . $this->object['id'] . '/'.$filename.'/icon_medium.png', $icon_medium, ["CacheControl" => "max-age=31536000"]);
            $storage->getDriver()->put('images/cards/' . $this->object['id'] . '/'.$filename.'/icon_small.png', $icon_small, ["CacheControl" => "max-age=31536000"]);

            // Update the card icon with the new filename
            $card->icon = $filename;
            $card->save();

        }
    }
}
