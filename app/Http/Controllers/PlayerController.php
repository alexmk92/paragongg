<?php

namespace App\Http\Controllers;

use App\Http\Traits\FindOrCreatePlayers;
use App\Match;
use App\Player;
use App\User;
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
        if(isBotName($username)) return view('players.bot');

        $player = $this->find($username, null);

        $user   = User::where('epic_account_id', $player->accountId)->first();

        if(isset($player->usernamePSN) && $username == $player->usernamePSN) {
            if(!$player->username) {
                return redirect('/players/psn/'.$player->usernamePSN);
            }
            return redirect('/players/'.$player->username);
        }

        $matches = $this->getMatches($player->accountId);
        foreach($matches as $match) {
            $match->playerStats = getPlayerFromMatch($match, $player->accountId);
        }

        $customBackground = '/assets/images/backgrounds/profile.jpg';
        return view('players.show', compact('player', 'user', 'matches', 'customBackground'));
    }

    public function showPSN($username)
    {
        if(isBotName($username)) return view('players.bot');

        $player = $this->findPSN($username);
        $user   = User::where('epic_account_id', $player->accountId)->first();

        if(isset($player->usernamePSN) && $username == $player->usernamePSN) {
            if($player->username) {
                return redirect('/players/'.$player->username);
            }
        }

        $matches = $this->getMatches($player);
        foreach($matches as $match) {
            $match->playerStats = getPlayerFromMatch($match, $player->accountId);
        }

        $customBackground = '/assets/images/backgrounds/profile.jpg';
        return view('players.show', compact('player', 'user', 'matches', 'customBackground'));
    }

    public function getMatches($player)
    {
        return Match::whereIn('replayId', $player->matches)->get();

        return $matches;
    }

    public function search(Request $request)
    {
        return redirect('/players/' . strtolower($request->username));
    }
}
