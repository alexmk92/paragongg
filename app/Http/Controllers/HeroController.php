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
        $customBackground = "/assets/custom/terrainDekker.jpg";
        $heroes = Hero::all();
        $activeHero = [];
        foreach($heroes as $hero) {
            if(strtolower($hero->name) == strtolower($slug)) {
                $activeHero = $hero;
            }
        }

        return view('heroes.show')->with('hero', $activeHero)->with('heroes', $heroes)->with('customBackground', $customBackground);
    }

}
