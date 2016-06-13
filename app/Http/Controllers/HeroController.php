<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Http\Requests;
use Illuminate\Http\Request;

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
        $hero = Hero::where('slug', urldecode($slug))->firstOrFail();
        $customBackground = "/assets/hero/".$hero->code."/terrain.jpg";
        // $stageBackground = "/assets/hero/".$activeHero->name."/terrain.jpg";  <-- WE WANT TO USE THIS IN PRODUCTION
        //$stageBackground = "/assets/hero/dekker/terrain.jpg";

        return view('heroes.show')->with('hero', $hero)->with('customBackground', $customBackground);
    }

    // Edit
    public function edit($code)
    {
        $hero = Hero::where('code', $code)->get();
        return view('heroes.edit')->with('hero', $hero);
    }

    // Update
    public function update($code, Request $request)
    {
        $updatedHero = json_decode($request->input('data'), true);
        $hero = Hero::where('code', $code);
        $hero->update($updatedHero[0]);
        session()->flash('notification', 'success|Hero saved.');

        return redirect()->back();
    }

    // Delete
    public function delete($code)
    {
        $hero = Hero::where('code', $code)->firstOrFail();
        $hero->delete();

        return redirect()->back();
    }

}
