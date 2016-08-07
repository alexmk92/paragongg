<?php

namespace App\Http\Controllers\API;

use App\Http\Traits\FindOrCreatePlayers;
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
        if(!$request->all()->players) abort(404);

        $players = $request->all()->players;
        foreach($players as $player) {
            $response = $this->find($player->username);
            $player->elo = $response->elo;
        }

        return response()->json($players);
    }
}
