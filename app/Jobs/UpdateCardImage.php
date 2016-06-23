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
        $card = Card::where('code', $this->object->id)->first();

        if (!$card) return true;

        // Save the background image
        $filename = explode('/', $this->object->images->large);
        $filename = end($filename);
        $filename = pathinfo($filename, PATHINFO_FILENAME);

        if(!$card->background || $card->background != $filename) {
            // If an old image exists, delete the directory
            if($card->background) $storage->deleteDirectory('images/cards/'.$this->object->id.'/'.$filename);

            // Create 3 sizes for the hero portrait
            $background_large  = Image::make('http:' . $this->object->images->large)->stream()->getContents();
            $background_medium = Image::make($background_large)->resize(135,180)->stream()->getContents();

            // Upload these to S3
            $storage->getDriver()->put('images/cards/' . $this->object->id . '/'.$filename.'/background_large.png', $background_large, ["CacheControl" => "max-age=31536000"]);
            $storage->getDriver()->put('images/cards/' . $this->object->id . '/'.$filename.'/background_medium.png', $background_medium, ["CacheControl" => "max-age=31536000"]);

            // Update the card background with the new filename
            $card->background = $filename;
            $card->save();
        }

        // Save the icon
        $filename = explode('/', $this->object->images->icon);
        $filename = end($filename);
        $filename = pathinfo($filename, PATHINFO_FILENAME);

        if(!$card->icon || $card->icon != $filename) {
            // If an old image exists, delete the directory
            if($card->icon) $storage->deleteDirectory('images/cards/'.$this->object->id.'/'.$filename);

            // Create 3 sizes for the hero portrait
            $icon_large  = Image::make('http:' . $this->object->images->icon)->stream()->getContents();
            $icon_medium = Image::make($icon_large)->resize(256,256)->stream()->getContents();
            $icon_small = Image::make($icon_large)->resize(128,128)->stream()->getContents();

            // Upload these to S3
            $storage->getDriver()->put('images/cards/' . $this->object->id . '/'.$filename.'/icon_large.png', $icon_large, ["CacheControl" => "max-age=31536000"]);
            $storage->getDriver()->put('images/cards/' . $this->object->id . '/'.$filename.'/icon_medium.png', $icon_medium, ["CacheControl" => "max-age=31536000"]);
            $storage->getDriver()->put('images/cards/' . $this->object->id . '/'.$filename.'/icon_small.png', $icon_small, ["CacheControl" => "max-age=31536000"]);

            // Update the card icon with the new filename
            $card->icon = $filename;
            $card->save();
        }
    }
}
