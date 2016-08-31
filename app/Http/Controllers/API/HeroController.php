<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Hero;
use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * Class HeroController
 * @package App\Http\Controllers\API
 */
class HeroController extends Controller
{
    /**
     * @return mixed
     */
    public function index()
    {
        $heroes = Hero::all();

        return response()->json($heroes);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        $hero = Hero::where('code', $id)->firstOrFail();

        return response()->json($hero);
    }
}
