<?php

namespace App\Http\Traits;

use App\Shortcode;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

/**
 * Class RetrievesCardCollection
 * @package App\Http\Traits
 */
trait RetrievesCardCollection
{
    /**
     * @param $user
     * @return bool
     */
    public function getCardCollection($user)
    {
        Cache::forget('user.'.$user->id.'.cards');
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
