<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Http\Traits\FindOrCreatePlayers;
use App\Jobs\CreatePlayers;
use App\Match;
use App\Player;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;

class MatchController extends Controller
{
    use FindOrCreatePlayers;

    // Show
    public function show($id)
    {
        $heroes = Hero::select('code', 'codename', 'name', 'image')->get();
        $match  = Match::where('replayId', $id)->firstOrFail();
        $customBackground = '/assets/images/backgrounds/profile.jpg';
        return view('matches.show', compact('match', 'customBackground', 'heroes'));
    }

    public function testtest()
    {
        $createArray = ['0d60882e386b4e4da1f3852592130352', 'ed486c5a10be4ab697d8663135d1ee6c'];
        $matchId = '43d5bafb1fb945abb7c16e16ac3efb27';
        $this->dispatch(new CreatePlayers($createArray, $matchId));
    }
}
