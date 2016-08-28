<?php

namespace App\Http\Controllers\API;

use App\Http\Traits\FindOrCreatePlayers;
use App\Jobs\CalculateMatchElo;
use App\Jobs\CreatePlayers;
use App\Match;
use App\Http\Controllers\Controller;
use App\Player;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    use FindOrCreatePlayers;

    public function player($accountId)
    {
        $skip = 0;
        $take = 10;

        if(isset($_GET['skip'])) $skip = (int)$_GET['skip'];
        if(isset($_GET['take'])) $take = (int)$_GET['take'];

        $player  = Player::where('accountId', $accountId)->first();
        $matches = Match::whereIn('replayId', $player->matches)
            ->skip($skip)
            ->take($take)
            ->get();

        return $matches;
    }
    // Show
    public function show($id)
    {
        $match = Match::where('replayId', $id)->first();
        return response()->json($match);
    }

    public function getPlayersElo()
    {
        $players     = request()->get('players');
        $matchId     = request()->get('matchId');

        $accountIds  = [];
        foreach($players as $player) {
            array_push($accountIds, $player['accountId']);
        }

        $playerElos  = [];
        $createArray = [];

        $players = Player::whereIn('accountId', $accountIds)->get();

        foreach($accountIds as $id) {
            $foundPlayer = null;
            foreach($players as $player) {
                $player = collect($player);
                if($player->contains($id)) {
                    $foundPlayer = $players->where('accountId', $id)->first();
                    break;
                }
            }
            if($foundPlayer) {
                $matchHistory = $foundPlayer['matches'];
                array_push($matchHistory, $matchId);
                $foundPlayer->matches = $matchHistory;
                $foundPlayer->save();
                array_push($playerElos, ['accountId' => $id, 'elo' => $foundPlayer['elo']]);
            } else {
                array_push($createArray, $id); // Push this player to array to be created
                array_push($playerElos, ['accountId' => $id, 'elo' => 1000]); // Return 1000 as elo for now
            }
        }

        // Create players that don't exist
        if(count($createArray) > 0) {
            $this->dispatch(new CreatePlayers($createArray, $matchId));
        }

        return response()->json($playerElos);
    }

    public function end($id)
    {
        $this->dispatch(new CalculateMatchElo($id));
    }

    // awsjidaqjkdqak - 1020
    // ewrqwlkeqkwelq - 1010
    // askldasldkasda - 1000

}
