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

class CalculateMatchElo extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels, DispatchesJobs, FindOrCreatePlayers;

    protected $replayId;
    protected $match;

    /**
     * Create a new job instance.
     *
     * @param $id
     */
    public function __construct($id)
    {
        $this->replayId = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->match = Match::where('replayId', $this->replayId)->first();
        if($this->match->gameType == 'pvp') {
            $team0 = array_filter($this->match->players, function($player) { return $player['team'] === 0; });
            $team1 = array_filter($this->match->players, function($player) { return $player['team'] === 1; });

            $team0elo = $this->getAverageElo($team0);
            $team1elo = $this->getAverageElo($team1);
            $team0we  = $this->getWinExpectancy($team0elo, $team1elo);
            $team1we  = $this->getWinExpectancy($team1elo, $team0elo);

            foreach($team0 as $p) {
                $player = Player::where('accountId', $p->accountId);
                $k = ($player->matches->count() >= 10 ? 30 : 15); // How many matches
                $player->elo = $this->getEloChange($k, 0, $team0we);
                $player->save();
            }

            foreach($team1 as $p) {
                $player = Player::where('accountId', $p->accountId);
                $k = ($player->matches->count() >= 10 ? 30 : 15);
                $player->elo = $this->getEloChange($k, 1, $team1we);
                $player->save();
            }
            //$team0change = $this->getEloChange(0, $team0we);
            //$team1change = $this->getEloChange(1, $team1we);
        }
    }

    public function getAverageElo($team)
    {
        $average = 0;
        foreach($team as $player) {
            if($player['elo'] == 0) {
                //$player['elo'] = 1000;
                $player['elo'] = rand(1000,1500);
            }
            $average += $player['elo'];
        }
        return (float)$average / count($team);
    }

    public function getWinExpectancy($rating1, $rating2)
    {
        $difference = (float)$rating1 - (float)$rating2;
        $powerOf    = -$difference/400;

        return 1 / (pow(10,$powerOf) + 1);
    }

    public function getEloChange($k, $team, $expectancy)
    {
        $result = 0;
        if($team == $this->match->winningTeam) $result = 1;

        return $k * ($result - $expectancy);
    }
}
