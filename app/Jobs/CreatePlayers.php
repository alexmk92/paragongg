<?php

namespace App\Jobs;

use App\Hero;
use App\Http\Traits\FindOrCreatePlayers;
use App\Match;
use App\Player;
use GuzzleHttp\Client;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class CreatePlayers extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels, DispatchesJobs, FindOrCreatePlayers;

    protected $accountIds;
    protected $matchId;

    /**
     * Create a new job instance.
     *
     * @param $id
     */
    public function __construct($accountIds, $matchId)
    {
        $this->accountIds = $accountIds;
        $this->matchId    = $matchId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $parameters = implode('&accountId=', $this->accountIds);
        $client = new Client();
        try {
            $res = $client->request('GET', 'https://account-public-service-prod03.ol.epicgames.com/account/api/public/account?accountId=' . $parameters, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();
        } catch (ClientException $exception) {
            // Do something here
        }

        $response = json_decode($res, true);

        foreach($response as $playerResponse) {
            $player              = new Player();
            $player->matches     = [$this->matchId];
            $player->accountId   = $playerResponse['id'];
            $player->elo         = 1000;
            $player->username    = null;
            $player->usernamePSN = null;
            // If has PSN account
            if(isset($playerResponse['externalAuths']['psn'])) {
                $player->usernamePSN = $playerResponse['externalAuths']['psn']['externalDisplayName'];
            }
            // If has EPIC account
            if(isset($response['displayName'])) {
                $player->username    = $playerResponse['displayName'];
            }
            $player->save();
        }
    }
}
