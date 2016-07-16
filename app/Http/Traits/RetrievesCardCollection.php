<?php

namespace App\Http\Traits;

use App\Shortcode;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;

trait RetrievesCardCollection
{
    public function getCardCollection($user)
    {
        if(!Cache::has('user.'.$user->id.'.cards')) {
            $client = new Client();
            try {
                $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$user->epic_account_id.'/cards', [
                    'headers' => [
                        'Accept'        => 'application/json',
                        'Authorization' => 'Bearer '.getOAuthToken($user),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ]
                ])->getBody();
            } catch (ClientException $e) {
                $error = $e->getResponse()->getBody()->getContents();
                Log::error("ClientException while trying to get user's cards: ".$error);
                return false;
            } catch (ServerException $e) {
                $error = $e->getResponse()->getBody()->getContents();
                Log::error("ServerException while trying to get user's cards: ".$error);
                return false;
            }

            $response = json_decode($res, true);

            $expires = Carbon::now()->addMinutes(10);
            Cache::put('user.'.$user->id.'.cards', $response, $expires);
        }

        return Cache::get('user.'.$user->id.'.cards');
    }
}
