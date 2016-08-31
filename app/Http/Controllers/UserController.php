<?php

namespace App\Http\Controllers;

use App\Deck;
use App\Guide;
use App\Hero;
use App\User;
use App\Http\Requests;

/**
 * Class UserController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * @param $username
     * @return mixed
     */
    public function show($username)
    {
        $user = User::where('username', $username)->firstOrFail();
        $guides = Guide::where('user_id', $user->id)->where('status', 'published')->get();
        $decks  = Deck::where('author_id', $user->id)->get();
        foreach($guides as $guide) {
            $guide->hero = Hero::where('code', $guide->hero_code)->first();
        }
        $twitchLive = false;
        if($user->twitch_tv) {
            $twitchLive = isTwitchLive($user->twitch_tv);
        }
        return view('users.show', compact('user', 'guides', 'decks', 'twitchLive'));
    }

    /**
     * @return mixed
     */
    public function profile()
    {
        $customBackground = '/assets/images/backgrounds/profile.jpg';
        return view('users.profile', compact('customBackground'));
    }
}
