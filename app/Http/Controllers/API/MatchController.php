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
        $match->startedAt = $match->startedAt->toDateTime()->format('Y-m-d H:i:s');
        return response()->json($match);
    }
}
