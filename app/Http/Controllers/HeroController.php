<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Http\Requests;
use App\Jobs\UpdateHeroImage;
use App\Jobs\UpdateHeroObject;
use GuzzleHttp\Client;
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

    // Pull latest heroes
    public function pullHeroes()
    {
        // Get latest hero list
        $client = new Client();
        $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/heroes', [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'Bearer '.APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $response = json_decode($res);

        // Run through each cards returned
        foreach($response as $object) {
            $this->dispatch(new UpdateHeroObject($object));
        }

        session()->flash('notification', 'success|Heroes update processing...');

        return redirect('/admin/jobs');
    }

    // Pull latest hero images
    public function pullHeroImages()
    {
        // Get latest hero list
        $client = new Client();
        $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/heroes', [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'Bearer '.APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $response = json_decode($res);

        // Run through each cards returned
        foreach($response as $object) {
            $this->dispatch(new UpdateHeroImage($object));
        }

        session()->flash('notification', 'success|Hero image update processing...');

        return redirect('/admin/jobs');
    }

}
