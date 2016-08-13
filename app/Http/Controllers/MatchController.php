<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Http\Traits\FindOrCreatePlayers;
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



    public function test13() {
        $createArray = [
            'f245bf2d6cd647a1814b56b9b39f5e46',
            'ccaa437e847448138857d25a43b4aa3f',
            '938186eb6b184e3fb2b11274e49af322'
        ];
        $this->createPlayers($createArray, '1d9b6252f2184394a99707478d7e0f70');
    }
}
