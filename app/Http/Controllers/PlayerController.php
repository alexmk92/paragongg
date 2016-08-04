<?php

namespace App\Http\Controllers;

use App\Match;
use App\Player;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
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

        if($username == $player->usernamePSN) {
            return redirect('/players/'.$player->username);
        }

        $matches = $this->getMatches($player->accountId);
        foreach($matches as $match) {
            $match->playerStats = getPlayerFromMatch($match, $player->accountId);
        }

        return view('players.show')->with('player', $player)->with('matches', $matches);
    }

    public function getPlayer($username)
    {
        $client = new Client();
        $PSNUsername = null;

        try { // EPIC
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/accounts/find/EPIC/' . $username, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();
        } catch (ClientException $exception) {
            if($exception->getResponse()->getStatusCode() == 404) {
                try { // PSN
                    $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/accounts/find/PSN/' . $username, [
                        'headers' => [
                            'Accept' => 'application/json',
                            'Authorization' => 'Bearer ' . APIToken(),
                            'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                        ]
                    ])->getBody();
                    $PSNUsername = $username;
                } catch (ClientException $exception) {
                    if($exception->getResponse()->getStatusCode() == 404) {
                        abort(404);
                    }
                }
            } else {
                abort(404);
            }
        }

        $response = json_decode($res);

        // If they're using PSN account name, we should store their EPIC account too
        if($PSNUsername) {
            try {
                  $psnRes = $client->request('GET', 'https://account-public-service-prod03.ol.epicgames.com/account/api/public/account?accountId='. $response->accountId, [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Authorization' => 'Bearer ' . APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ]
                ])->getBody();
                $psnResponse = json_decode($psnRes, true);
                $username = $psnResponse[0]['displayName'];
            } catch (ClientException $exception) {
                abort(404);
            }
        }

        // If the accountId already exists, but username doesn't, they changed name so update it
        $player = Player::where('accountId', $response->accountId)->first();

        if(!$player) {
            $player = new Player();
            $player->accountId = $response->accountId;
            $player->username  = $username;
            $player->usernamePSN = $PSNUsername;
            $player->save();
        } else {
            $player->username  = $username;
            $player->usernamePSN = $PSNUsername;
            $player->save();
        }

        return $player;
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
