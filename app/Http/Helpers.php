<?php
// Helpers

//use GuzzleHttp\Client;
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