<?php

namespace App\Http\Controllers;

use App\Http\Traits\FindOrCreatePlayers;
use App\Match;
use App\Player;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;

use App\Http\Requests;

class PlayerController extends Controller
{
    use FindOrCreatePlayers;
    // Show
    public function show($username)
    {
        if(isBotName($username)) abort(404);

        $player = $this->find($username);

        if(isset($player->usernamePSN) && $username == $player->usernamePSN) {
            return redirect('/players/'.$player->username);
        }

        $matches = $this->getMatches($player->accountId);
        foreach($matches as $match) {
            $match->playerStats = getPlayerFromMatch($match, $player->accountId);
        }

        $customBackground = '/assets/images/backgrounds/profile.jpg';
        return view('players.show', compact('player', 'matches', 'customBackground'));
    }

    public function getPlayer($username)
    {


        return $player;
    }

    public function create()
    {
    }

    public function getMatches($accountId)
    {
        $matches = Match::where(['players' => array('$elemMatch' => array('accountId' => $accountId))])->take(10)->get();
        return $matches;
    }

    public function search(Request $request)
    {
        return redirect('/players/' . strtolower($request->username));
    }
}
