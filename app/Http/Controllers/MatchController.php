<?php

namespace App\Http\Controllers;

use App\Match;
use App\Player;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cache;

class MatchController extends Controller
{
    // Show
    public function show($id)
    {
        $match = Match::where('replayId', $id);
        $customBackground = '/assets/images/backgrounds/profile.jpg';
        return view('matches.show', compact('match', 'customBackground'));
    }
}
