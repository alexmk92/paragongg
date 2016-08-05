<?php

namespace App\Http\Controllers\API;

use App\Match;
use App\Http\Controllers\Controller;

class MatchController extends Controller
{
    // Show
    public function show($id)
    {
        $match = Match::findOrFail($id);
        return response()->json($match);
    }
}
