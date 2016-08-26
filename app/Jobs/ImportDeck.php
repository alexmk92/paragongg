<?php

namespace App\Jobs;

use App\Http\Traits\GeneratesShortcodes;
use App\Http\Traits\ImportExportDecks;
use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ImportDeck extends Job implements ShouldQueue
{
    use GeneratesShortcodes, ImportExportDecks, InteractsWithQueue, SerializesModels;

    protected $user;
    protected $deckId;

    /**
     * Create a new job instance.
     */
    public function __construct($user, $deckId)
    {
        $this->user = $user;
        $this->deckId = $deckId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->importToParagonGG($this->user, $this->deckId);
    }
}
