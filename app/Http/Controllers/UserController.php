<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests;

class UserController extends Controller
{
    // Show
    public function show($username)
    {
        $user = User::where('username', $username)->firstOrFail();
        $twitchLive = false;
        if($user->twitch_tv) {
            $twitchLive = isTwitchLive($user->twitch_tv);
        }
        return view('users.show')->with('user', $user)->with('twitchLive', $twitchLive);
    }
}
