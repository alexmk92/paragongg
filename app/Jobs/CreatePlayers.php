<?php

namespace App\Jobs;

use App\Hero;
use App\Http\Traits\FindOrCreatePlayers;
use App\Match;
use App\Player;
use Exception;
use GuzzleHttp\Client;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;
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
            if(isset($playerResponse['displayName'])) {
                $player->username    = $playerResponse['displayName'];
            }
            $player->save();
        }
    }

    /**
     * The job failed to process.
     *
     * @param Exception $e
     * @internal param Exception $exception
     */
    public function failed(Exception $e)
    {
        Log::warning('Job failed: '.$e);
        // Send user notification of failure, etc...
        $expires = Carbon::now()->addHours(1);
        if(!Cache::has('recentError')) {
            Cache::put('recentError', $e, $expires);
            Mail::send('emails.jobfail', ['exception' => $e], function ($mail) {
                $mail->from('noreply@paragon.gg', 'Paragon.gg System');
                $mail->to('notifications@paragon.gg', 'Paragon.gg Notifications')->subject('A job has failed on the queue');
            });
        }

    }
}
