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

/**
 * Class MatchController
 * @package App\Http\Controllers
 */
class MatchController extends Controller
{
    use FindOrCreatePlayers;

    /**
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        $heroes = Hero::select('code', 'codename', 'name', 'image')->get();
        $match  = Match::where('replayId', $id)->firstOrFail();
        $customBackground = '/assets/images/backgrounds/profile.jpg';
        return view('matches.show', compact('match', 'customBackground', 'heroes'));
    }
}
