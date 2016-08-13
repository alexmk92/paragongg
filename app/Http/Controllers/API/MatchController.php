<?php

namespace App\Http\Controllers\API;

use App\Http\Traits\FindOrCreatePlayers;
use App\Jobs\CalculateMatchElo;
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
        $match->startedAt = $match->startedAt->toDateTime()->format('Y-m-d H:i:s');
        return response()->json($match);
    }

    public function getPlayersElo(Request $request)
    {
        if(!$request->all()['players']) abort(404);

        $players = $request->all()['players'];
        $playerElos = [];
        $createArray = [];

        foreach($players as &$player) {
            $result = Player::where('accountId', $player['accountId'])->first();
            if(!$result) {
                array_push($createArray, $player['accountId']); // Push this player to array to be created
                array_push($return, ['accountId' => $player['accountId'], 'elo' => 1000]); // Return 1000 as elo for now
            }  else {
                array_push($result->matchHistory, $player['matchId']);
                $result->save();
                array_push($return, ['accountId' => $player['accountId'], 'elo' => $result->elo]);
            }
        }

        $this->createPlayers($createArray);

        return response()->json($playerElos);
    }

    public function end($id)
    {
        $this->dispatch(new CalculateMatchElo($id));
    }

}
