<?php

namespace App\Http\Controllers\API;

use App\Http\Traits\FindOrCreatePlayers;
use App\Jobs\CalculateMatchElo;
use App\Match;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    use FindOrCreatePlayers;
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

        foreach($players as &$player) {
            $result = Player::where('accountId', $player['accountId'])->first();
            if(!$result) {
                // @TODO create player profile
                array_push($return, ['accountId' => $player['accountId'], 'elo' => 1000]);
            }  else {
                array_push($return, ['accountId' => $player['accountId'], 'elo' => $result->elo]);
            }
        }

        return response()->json($playerElos);
    }

    public function end($id)
    {
        $this->dispatch(new CalculateMatchElo($id));
    }

}
