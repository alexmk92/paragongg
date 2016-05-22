<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Http\Requests;

class HeroController extends Controller
{
    // Index
    public function index()
    {
        $heroes = Hero::all();

        return view('heroes.index')->with('heroes', $heroes);
    }

    // Read
    public function show($slug)
    {
        $hero = Hero::where('name', ucfirst(strtolower($slug)))->firstOrFail();

        return view('heroes.show')->with('hero', $hero);
    }

}
