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
//
//        $client = new Client();
//        try {
//            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$this->user->epic_account_id.'/deck/'.$this->deckId, [
//                'headers' => [
//                    'Accept'        => 'application/json',
//                    'Authorization' => 'Bearer '.getOAuthToken($this->user),
//                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
//                ]
//            ])->getBody();
//        } catch (ClientException $e) {
//            $error = $e->getResponse()->getBody()->getContents();
//            Log::error("ClientException while trying to get user's deck: ".$error);
//            return false;
//        } catch (ServerException $e) {
//            $error = $e->getResponse()->getBody()->getContents();
//            Log::error("ServerException while trying to get user's deck: ".$error);
//            return false;
//        }
//
//        $data = json_decode($res, true);
//
//        // Create cards array
//        $cards = [];
//        $affinities = [
//            'universal' => 0,
//            'fury' => 0,
//            'intellect' => 0,
//            'growth' => 0,
//            'order' => 0,
//            'corruption' => 0,
//        ];
//
//        foreach($data['cards'] as $card) {
//            array_push($cards, $card['id']);
//            $affinities[strtolower($card['affinities'][0])]++;
//        }
//
//        $deck              = new Deck();
//        $deck->title       = $data['name'];
//        $deck->slug        = createSlug($data['name']);
//        $deck->author_id   = $this->user->id;
//        $deck->description = null;
//        $deck->hero        = Hero::where('code', $data['hero']['id'])->firstOrFail()->toArray();
//        $deck->votes       = 0;
//
//        $deck->cards       = $cards;
//
//        $deck->builds      = [];
//        $deck->affinities = $affinities;
//
//        $deck->save();
//
//        // Generate shortcode
//        $this->generate('/decks/'.$deck->id.'/'.$deck->slug, 'deck', $deck->id);
    }
}
