<?php

use App\CommentThread;
use App\CommentThreadComment;
use App\Deck;
use App\Setting;
use App\Shortcode;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

/**
 * @param $file
 * @return string
 */
function getVersionedFile($file)
{
    $path = public_path();
    static $manifest = null;

    if (is_null($manifest))
    {
        $manifest = json_decode(file_get_contents($path.'/build/rev-manifest.json'), true);
    }

    if (isset($manifest[$file]))
    {
        return '/build/'.$manifest[$file];
    }

    throw new InvalidArgumentException("File {$file} not defined in asset manifest.");
}

/**
 * @param $uri
 * @return CommentThread
 */
function findOrCreateThread($uri)
{
    $thread = CommentThread::where('uri', $uri)->first();

    if(!$thread) {
        $thread = new CommentThread();
        $thread->uri = $uri;
        $thread->save();
    }

    $comments = CommentThreadComment::where('thread_id', $thread->id)
        ->select('comment_thread_comments.*', 'users.avatar', 'users.username')
        ->select('comment_thread_comments.*', 'users.avatar', 'users.username', DB::raw('votes.id as user_voted'))
        ->join('users', 'users.id', '=', 'comment_thread_comments.user_id')
        ->leftJoin('votes', function($join)
        {
            $join->on('votes.ref_id', '=', 'comment_thread_comments.id');
            $join->where('votes.user_id', '=', auth()->check() ? auth()->user()->id : 0);
        })
        ->orderBy('created_at', 'asc')
        //->toSql();
        ->get();

    $thread->comments = $comments;
    return $thread;
}

/**
 * @param $thread
 * @return mixed
 */
function getCommentCount($thread)
{
    $thread = CommentThread::find($thread);
    return CommentThreadComment::where('thread_id', $thread->id)->count();
}

/**
 * @param $channel
 * @return bool
 */
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

/**
 * @return string
 */
function displayNotification()
{
    if (Session::has('notification'))
    {
        $notification = explode('|', Session::get('notification'));

        return '<div id="notification" class="notification notification-'.$notification[0].'" onclick="this.style.display=\'none\';">'.$notification[1].'<i class="fa fa-times" aria-hidden="true"></i></div>';
    }
    return '';
}

/**
 * @return bool|string
 */
function globalNotification()
{
    $globalNotification = Setting::where('key', 'globalNotification')->first();

    if($globalNotification && $globalNotification->value) {
        return '<div class="global-notification cf"><i class="fa fa-info-circle" aria-hidden="true"></i>'.$globalNotification->value.'</div>';
    }

    return false;
}

/**
 * @return mixed
 */
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

/**
 * @return string
 */
function S3URL()
{
    return 'https://s3.amazonaws.com/paragongg-us';
}

/**
 * @param $user
 * @return string
 */
function getAvatar($user)
{
    if(!$user->avatar) {
        return "/assets/images/avatar.png";
    }
    return S3URL() . "/images/users/" . $user->id . "/avatars/" . $user->avatar;
}

/**
 * @param $string
 * @return string
 */
function createSlug($string)
{
    $string = strtolower($string);
    $string = str_replace("'", "", $string); // Delete apostrophe
    $string = str_replace("-", " ", $string); // Swap hyphens for space (end up as hyphens anyway)
    $string = preg_replace('/[\&]/', "and", $string); // Swap & for and
    preg_match_all('/[\w]+/', $string, $matches);
    return implode("-", $matches[0]);
}

/**
 * @param $index
 * @param $ability
 * @param $abilityString
 * @return bool
 */
function checkAbilitySelection($index, $ability, $abilityString)
{
    $abilities = explode(',', $abilityString);
    if($abilities[$index-1] == $ability) {
        return true;
    }
    return false;
}

/**
 * @param $string
 * @return null
 */
function getDeckFromString($string)
{
    $deck = null;
    // If it's a URL (starts http)
    if(filter_var($string, FILTER_VALIDATE_URL)) {

        // If it's a paragon link
        $hostname = parse_url($string, PHP_URL_HOST);
        if($hostname == 'paragon.gg' || $hostname == 'para.gg' || $hostname == 'paragon.dev') {
            $path = parse_url($string, PHP_URL_PATH);
            $exploded = explode('/',$path);
            if($exploded[1] == 'decks') {
                $deck = Deck::find($exploded[2]);
            } else {
                // Assume it's a shortcode
                $shortcode = Shortcode::where('code', $exploded[1])->first();
                if($shortcode) {
                    $deck = Deck::find($shortcode->resource_id);
                }
            }
        }
    } else {
        // Assume it's a shortcode
        $shortcode = Shortcode::where('code', $string)->first();

        if($shortcode) {
            $deck = Deck::find($shortcode->resource_id);
        }
    }

    return $deck;
}

/**
 * @param $match
 * @param $accountId
 * @return bool
 */
function getPlayerFromMatch($match, $accountId) {
    foreach($match['players'] as $player) {
        if($player['accountId'] == $accountId) {
            return $player;
        }
    }
    return false;
}

/**
 * @param $array
 * @param $key
 * @param $value
 * @return bool
 */
function find_key_value($array, $key, $value) {
    foreach ($array as $item)
    {
        if (is_array($item) && find_key_value($item, $key, $value)) return true;

        if (isset($item[$key]) && $item[$key] == $value) return true;
    }

    return false;
}

/**
 * @param $date
 * @return mixed
 */
function getMongoDiff($date) {
    $date = $date->toDateTime()->getTimestamp();
    return Carbon::createFromTimestamp($date)->diffForHumans();
}

/**
 * @param $match
 * @return false|string
 */
function getMatchLength($match) {
    return gmdate("i:s", $match->latestCheckpointTime);
}

/**
 * @param $username
 * @return bool
 */
function isBotName($username) {
    $botNames = [
        'blue_dekker', 'red_dekker',
        'blue_feng mao', 'red_feng mao',
        'blue_grim.exe', 'red_grim.exe',
        'blue_gadget', 'red_gadget',
        'blue_gideon', 'red_gideon',
        'blue_greystone', 'red_greystone',
        'blue_grux', 'red_grux',
        'blue_howitzer', 'red_howitzer',
        'blue_iggy & scorch', 'red_iggy & scorch',
        'blue_kallari', 'red_kallari',
        'blue_khaimera', 'red_khaimera',
        'blue_murdock', 'red_murdock',
        'blue_muriel', 'red_muriel',
        'blue_rampage', 'red_rampage',
        'blue_riktor', 'red_riktor',
        'blue_sevarog', 'red_sevarog',
        'blue_sparrow', 'red_sparrow',
        'blue_steel', 'red_steel',
        'blue_twinblast', 'red_twinblast',
        'blue_fey', 'red_fey',
    ];
    return in_array(strtolower($username), $botNames);
}