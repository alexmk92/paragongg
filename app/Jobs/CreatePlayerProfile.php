<?php

namespace App\Jobs;

use App\Hero;
use App\Http\Traits\FindOrCreatePlayers;
use App\Match;
use GuzzleHttp\Client;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class CreatePlayerProfile extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels, DispatchesJobs, FindOrCreatePlayers;

    protected $replayId;

    /**
     * Create a new job instance.
     *
     * @param $id
     */
    public function __construct($id)
    {
        $this->accountId = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // Double check they don't exist first

        // Create the player
    }
}
