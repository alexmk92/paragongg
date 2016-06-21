<?php

namespace App\Http\Controllers;

use App\Match;
use App\Player;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;

class MatchController extends Controller
{
    // Show
    public function show($username)
    {

    }

    public function getMatches($accountId)
    {
        if(!Cache::has('player.'.$accountId.'.recentMatches')) {
            $client = new Client();
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$accountId.'/match/history', [
                'headers' => [
                    'Accept'        => 'application/json',
                    'Authorization' => 'Bearer '.APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();

            $response = json_decode($res);

            foreach($response as $matchResult) {
                if(!Match::where('matchId', $matchResult->id)->first()) {
                    $match            = new Match();
                    $match->matchId   = $matchResult->id;
                    $match->timestamp = $matchResult->timestamp;
                    $match->data      = $matchResult->data;
                    $match->save();
                }
            }

            $expires = Carbon::now()->addMinutes(15);
            Cache::put('player.'.$accountId.'.recentMatches', true, $expires);
        }
        return Match::where('data.playerInfo.accountId', $accountId)->get();
    }
}
