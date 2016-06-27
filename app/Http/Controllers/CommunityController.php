<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;

class CommunityController extends Controller
{
    public function index()
    {
        $streams = $this->getStreams();
        return view('community.index', compact('streams'));
    }

    public function getStreams()
    {
        if (!Cache::has('twitchStreams')) {
            $request = @file_get_contents('https://api.twitch.tv/kraken/streams?game=Paragon');
            $expires = Carbon::now()->addMinutes(5);
            Cache::put('twitchStreams', $request, $expires);
        }

        return array_slice(json_decode(Cache::get('twitchStreams'))->streams, 0, 9);
    }
}
