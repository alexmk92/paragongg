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
    
}
