<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Hero;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class HeroController extends Controller
{
    public function index()
    {
        $heroes = Hero::all();

        return response()->json($heroes);
    }

    public function show($id)
    {
        $hero = Hero::where('code', $id)->firstOrFail();

        return response()->json($hero);
    }
}
