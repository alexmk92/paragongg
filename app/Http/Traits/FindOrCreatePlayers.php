<?php

namespace App\Http\Traits;

use App\Setting;
use Illuminate\Http\Request;

use App\Http\Requests;
use MongoDB\Client;

trait FindOrCreatePlayers
{
    public function find($username)
    {
        $player = Player::where('username', $username)->first();
        if($player != null) return $player;

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
            $player->elo = 1000.00;
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
}
