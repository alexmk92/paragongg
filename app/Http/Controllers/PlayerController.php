<?php

namespace App\Http\Controllers;

use App\Match;
use App\Player;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;

class PlayerController extends Controller
{
    // Show
    public function show($username)
    {
        $player = Player::where('username', $username)->first();

        if(!$player) {
            $player = $this->getPlayer($username);
        }

        $matches = app('App\Http\Controllers\MatchController')->getMatches($player->accountId);

        dd($matches);
        return view('players.show')->with('player', $player)->with('matches', $matches);
    }

    public function getPlayer($username)
    {
        $client = new Client();
        $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/accounts/find/'.$username, [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'Bearer '.APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $response = json_decode($res);

        // If the accountId already exists, but username doesn't, they changed name so update it
        $player = Player::where('accountId', $response->accountId)->first();

        if(!$player) {
            $player = new Player();
            $player->accountId = $response->accountId;
            $player->username  = $username;
            $player->save();
        }

        return $player;
    }
}
