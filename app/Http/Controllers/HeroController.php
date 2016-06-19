<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Http\Requests;
use App\Jobs\UpdateHeroImage;
use App\Jobs\UpdateHeroObject;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

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
        $customBackground = S3URL()."/images/heroes/".$hero->code."/background.jpg";

        return view('heroes.show')->with('hero', $hero)->with('customBackground', $customBackground);
    }

    // Edit
    public function edit($code)
    {
        $hero = Hero::where('code', $code)->firstOrFail();
        return view('heroes.edit')->with('hero', $hero);
    }

    // Update
    public function update($code, Request $request)
    {
        $hero = Hero::where('code', $code)->firstOrFail();
//        $updatedHero = json_decode($request->input('data'), true);
//        $hero->update($updatedHero[0]);

        if($request->hasFile('background')) {
            $path = 'images/heroes/' . $hero->code . '/background.jpg';
            $storage = Storage::disk('s3');
            $image = Image::make($request->file('background'));
            $storage->getDriver()->put($path, $image->stream()->getContents(), ["CacheControl" => "max-age=604800"]);
        }

        if($request->hasFile('cutout')) {
            $path = 'images/heroes/' . $hero->code . '/cutout.png';
            $storage = Storage::disk('s3');
            $image = Image::make($request->file('cutout'));
            $storage->getDriver()->put($path, $image->stream()->getContents(), ["CacheControl" => "max-age=86400"]);
        }

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
