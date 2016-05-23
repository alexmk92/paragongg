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
        $heroes = Hero::all();
        $activeHero = [];
        foreach($heroes as $hero) {
            if(strtolower($hero->name) == strtolower($slug)) {
                $activeHero = $hero;
            }
        }
        $heroModel = "/assets/hero/dekker/portrait.png";
        $customBackground = "none";
        // $stageBackground = "/assets/hero/".$activeHero->name."/terrain.jpg";  <-- WE WANT TO USE THIS IN PRODUCTION
        $stageBackground = "/assets/hero/dekker/terrain.jpg";

        return view('heroes.show')->with('hero', $activeHero)->with('heroes', $heroes)->with('customBackground', $customBackground)->with('stageBackground', $stageBackground)->with('heroModel', $heroModel);
    }

}
