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

/**
 * Class CalculateMatchElo
 * @package App\Jobs
 */
class CalculateMatchElo extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels, DispatchesJobs, FindOrCreatePlayers;

    protected $replayId;
    protected $match;
    protected $teams = [];

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
            $this->teams[0] = array_filter($this->match->players, function($player) { return $player['team'] === 0; });
            $this->teams[1] = array_filter($this->match->players, function($player) { return $player['team'] === 1; });
            $this->calculateTeamElo();
        }
    }

    public function calculateTeamElo()
    {
        $team = [
            1 => [
                'avg' => 0,
                'we'  => 0,
            ],
            2 => [
                'avg' => 0,
                'we'  => 0,
            ]
        ];

        // Calculate avg elo for each team
        for($i = 0; $i < 2; $i++) {
            $team[$i]['elo'] = $this->getAverageElo($this->teams[$i]);
        }

        // Generate win expectency and save elo change per player
        for($i = 0; $i < 2; $i++) {
            $x = ($i == 0) ? 1 : 0;
            $team[$i]['we']  = $this->getWinExpectancy($team[$i]['elo'], $team[$x]['elo']);

            foreach($team[$i] as $p) {
                $player = Player::where('accountId', $p->accountId);
                $k = ($player->matches->count() >= 10 ? 30 : 15); // How many matches
                $player->elo = $this->getEloChange($k, 0, $team[$i]['we']);
                $player->save();
            }
        }
    }

    /**
     * @param $team
     * @return float
     */
    public function getAverageElo($team)
    {
        $average = 0;
        foreach($team as $player) {
            if($player['elo'] == 0) {
                $player['elo'] = 1000;
            }
            $average += $player['elo'];
        }
        return (float)$average / count($team);
    }

    /**
     * @param $rating1
     * @param $rating2
     * @return float|int
     */
    public function getWinExpectancy($rating1, $rating2)
    {
        $difference = (float)$rating1 - (float)$rating2;
        $powerOf    = -$difference/400;

        return 1 / (pow(10,$powerOf) + 1);
    }

    /**
     * @param $k
     * @param $team
     * @param $expectancy
     * @return mixed
     */
    public function getEloChange($k, $team, $expectancy)
    {
        $result = 0;
        if($team == $this->match->winningTeam) $result = 1;

        return $k * ($result - $expectancy);
    }
}
