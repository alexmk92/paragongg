<?php

namespace App\Http\Controllers\API;

use App\Match;
use App\Http\Controllers\Controller;

class MatchController extends Controller
{
    // Show
    public function show($id)
    {
        $match = Match::where('replayId', $id)->first();
        return response()->json($match);
    }
}
