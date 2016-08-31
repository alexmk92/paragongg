<?php

namespace App\Http\Traits;

use App\Player;
use App\Setting;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;

use App\Http\Requests;

/**
 * Class FindOrCreatePlayers
 * @package App\Http\Traits
 */
trait FindOrCreatePlayers
{
    /**
     * @param $username
     * @return Player
     */
    public function find($username)
    {
        $player = Player::where('username', $username)->first();
        if(!$player) $player = Player::where('usernamePSN', $username)->first();
        if($player != null) return $player;

        /* If we couldn't find player, try to get their details through API */
        $client       = new Client();
        $usernameEPIC = null;
        $usernamePSN  = null;

        /*
         * [EPIC] Check if this username is associated with an Epic account
         */
        try {
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/accounts/find/EPIC/' . $username, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();

            $usernameEPIC = true;
        } catch (ClientException $exception) {
            if($exception->getResponse()->getStatusCode() == 404) {
                /*
                 * [PSN] Couldn't find an EPIC account with this username, so try finding a PSN account
                 */
                try { // PSN
                    $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/accounts/find/PSN/' . $username, [
                        'headers' => [
                            'Accept' => 'application/json',
                            'Authorization' => 'Bearer ' . APIToken(),
                            'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                        ]
                    ])->getBody();

                    $usernamePSN = true;
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

        // If they're using EPIC name, set it
        if($usernameEPIC) {
            $usernameEPIC = $username;
        }

        // If they're using PSN account name, we should store their EPIC account too
        if($usernamePSN) {
            try {
                $psnRes = $client->request('GET', 'https://account-public-service-prod03.ol.epicgames.com/account/api/public/account?accountId='. $response->accountId, [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Authorization' => 'Bearer ' . APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ]
                ])->getBody();
                $psnResponse = json_decode($psnRes, true);

                if(isset($psnResponse[0]['displayName'])) {
                    $usernameEPIC = $psnResponse[0]['displayName'];
                }
                $usernamePSN = $psnResponse[0]['externalAuths']['psn']['externalDisplayName'];
            } catch (ClientException $exception) {
                abort(404);
            }
        }

        // If the accountId already exists, but username doesn't, they changed name so update it
        $player = Player::where('accountId', $response->accountId)->first();

        if(!$player) {
            $player = new Player();
            $player->elo = 1000.00;
            $player->accountId   = $response->accountId;
            $player->username    = $usernameEPIC;
            $player->usernamePSN = $usernamePSN;
            $player->matches     = [];
            $player->save();
        } else {
            $player->username    = $usernameEPIC;
            $player->usernamePSN = $usernamePSN;
            $player->matches     = [];
            $player->save();
        }

        return $player;
    }

    /**
     * @param $username
     * @return Player
     */
    public function findPSN($username)
    {
        $player = Player::where('usernamePSN', $username)->first();
        if($player != null) return $player;

        /* If we couldn't find player, try to get their details through API */
        $client       = new Client();
        $usernameEPIC = null;
        $usernamePSN  = null;

        try {
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/accounts/find/PSN/' . $username, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();
        } catch (ClientException $exception) {
            if($exception->getResponse()->getStatusCode() == 404) {
                abort(404);
            }
        }
        $response = json_decode($res);

        // Try to get EPIC username if they have one
        if($usernamePSN) {
            try {
                $psnRes = $client->request('GET', 'https://account-public-service-prod03.ol.epicgames.com/account/api/public/account?accountId='. $response->accountId, [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Authorization' => 'Bearer ' . APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ]
                ])->getBody();
                $psnResponse = json_decode($psnRes, true);

                if(isset($psnResponse[0]['displayName'])) {
                    $usernameEPIC = $psnResponse[0]['displayName'];
                }
                $usernamePSN = $psnResponse[0]['externalAuths']['psn']['externalDisplayName'];
            } catch (ClientException $exception) {
                abort(404);
            }
        }

        // If the accountId already exists, but username doesn't, they changed name so update it
        $player = Player::where('accountId', $response->accountId)->first();

        if(!$player) {
            $player = new Player();
            $player->elo = 1000.00;
            $player->accountId   = $response->accountId;
            $player->username    = $usernameEPIC;
            $player->usernamePSN = $usernamePSN;
            $player->matches     = [];
            $player->save();
        } else {
            $player->username    = $usernameEPIC;
            $player->usernamePSN = $usernamePSN;
            $player->matches     = [];
            $player->save();
        }

        return $player;
    }

    /**
     * @param $accountIds
     * @param $matchId
     */
    public function createPlayers($accountIds, $matchId)
    {
        $parameters = implode('&accountId=', $accountIds);
        $client = new Client();
        try {
            $res = $client->request('GET', 'https://account-public-service-prod03.ol.epicgames.com/account/api/public/account?accountId=' . $parameters, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Authorization' => 'Bearer ' . APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();
        } catch (ClientException $exception) {

        }

        $response = json_decode($res, true);

        foreach($response as $playerResponse) {
            $player              = new Player();
            $player->matches     = [$matchId];
            $player->accountId   = $playerResponse['id'];
            $player->elo         = 1000;
            $player->username    = null;
            $player->usernamePSN = null;
            // If has PSN account
            if(isset($playerResponse['externalAuths']['psn'])) {
                $player->usernamePSN = $playerResponse['externalAuths']['psn']['externalDisplayName'];
            }
            // If has EPIC account
            if(isset($response['displayName'])) {
                $player->username    = $playerResponse['displayName'];
            }
            $player->save();
        }

    }


}
