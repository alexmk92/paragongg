<?php

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

function isTwitchLive($channel)
{
    if (!Cache::has('twitchLive.'.$channel)) {
        $request = json_decode(@file_get_contents( 'https://api.twitch.tv/kraken/streams/' . $channel ));
        Cache::put('twitchLive.'.$channel, $request, 1);
    }

    $twitchLive = Cache::get('twitchLive.'.$channel);

    // Cache this request
    return (!is_null($twitchLive->stream)) ? TRUE : FALSE;
}

function displayNotification()
{
    if (Session::has('notification'))
    {
        $notification = explode('|', Session::get('notification'));

        return '<div class="notification notification-'.$notification[0].'">'.$notification[1].'</div>';
    }

    return '';
}

function APIToken()
{
    if(!Cache::has('APITOKEN')) {

        $auth = base64_encode(env('EPIC_API_CLIENT_ID').':'.env('EPIC_API_CLIENT_SECRET'));

        $client = new Client();
        $res = $client->request('POST', 'https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/token', [
            'headers' => [
                'Authorization' => 'Basic '.$auth,
                'Cache-Control'     => 'no-cache',
                'Content-Type'      => 'application/x-www-form-urlencoded'
            ],
            'form_params' => [
                'grant_type' => 'password',
                'username'   => env('EPIC_API_EMAIL'),
                'password'   => env('EPIC_API_PASSWORD'),
            ]
        ])->getBody();
        $response = json_decode($res);
        $expires = Carbon::now()->addSeconds($response->expires_in);
        Cache::put('APITOKEN', $response->access_token, $expires);

    }

    return Cache::get('APITOKEN');
}