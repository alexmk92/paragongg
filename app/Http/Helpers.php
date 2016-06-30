<?php

use App\CommentThread;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

function findOrCreateThread($uri)
{
    $thread = CommentThread::where('uri', $uri)->first();

    if(!$thread) {
        $thread = new CommentThread();
        $thread->uri = $uri;
        $thread->save();
    }

    return $thread;
}

function isTwitchLive($channel)
{
    if (!Cache::has('twitchLive.'.$channel)) {
        $request = json_decode(@file_get_contents( 'https://api.twitch.tv/kraken/streams/' . $channel ));
        Cache::put('twitchLive.'.$channel, $request, 3);
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

        return '<div id="notification" class="notification notification-'.$notification[0].'" onclick="this.style.display=\'none\';">'.$notification[1].'<i class="fa fa-times" aria-hidden="true"></i></div>';
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

function OAuthToken($code = false)
{
    $user = Auth::user();

    if(!$code) $code = getOAuthToken();
    Cache::forget('user.'.$user->id.'.token');
    if(!Cache::has('user.'.$user->id.'.token')) {

        $auth = base64_encode(env('EPIC_API_CLIENT_ID').':'.env('EPIC_API_CLIENT_SECRET'));

        $client = new Client();
        $res = $client->request('POST', 'https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/token', [
            'headers' => [
                'Authorization' => 'Basic '.$auth,
                'Cache-Control'     => 'no-cache',
                'Content-Type'      => 'application/x-www-form-urlencoded'
            ],
            'form_params' => [
                'grant_type' => 'authorization_code',
                'code'       => $code
            ]
        ])->getBody();
        $response = json_decode($res);

        $user->epic_account_id       = $response->account_id;
        $user->oauth_token           = $response->access_token;
        $user->oauth_expires         = Carbon::now()->addSeconds($response->expires_in);
        $user->oauth_refresh_token   = $response->refresh_token;
        $user->oauth_refresh_expires = Carbon::now()->addSeconds($response->refresh_expires);

        $user->save();
        $expires = Carbon::now()->addSeconds($response->expires_in);

        Cache::put('user.'.$user->id.'.token', $response->access_token, $expires);

    }

    return Cache::get('user.'.$user->id.'.token');
}

function S3URL()
{
    return 'https://s3-eu-west-1.amazonaws.com/paragon.gg';
}

function createSlug($string)
{
    $string = strtolower($string);
    $string = str_replace("'", "", $string); // Delete apostrophe
    $string = str_replace("-", " ", $string); // Swap hyphens for space (end up as hyphens anyway)
    $string = preg_replace('/[\&]/', "and", $string); // Swap & for and
    preg_match_all('/[\w]+/', $string, $matches);
    return implode("-", $matches[0]);
}
