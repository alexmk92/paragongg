<?php

namespace App\Http\Controllers;

use App\Hero;
use App\Http\Requests;
use App\Jobs\UpdateHeroImage;
use App\Jobs\UpdateHeroObject;
use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Collection;
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

        $baseStats = new Collection();
        if($request->has('stat_physical_damage')) $baseStats->physical_damage = (float)$request->stat_physical_damage;
        if($request->has('stat_energy_damage')) $baseStats->energy_damage = (float)$request->stat_energy_damage;
        if($request->has('stat_crit_chance')) $baseStats->crit_chance = (float)$request->stat_crit_chance;
        if($request->has('stat_crit_bonus')) $baseStats->crit_bonus = (float)$request->stat_crit_bonus;
        if($request->has('stat_attack_speed')) $baseStats->attack_speed = (float)$request->stat_attack_speed;
        if($request->has('stat_physical_pen')) $baseStats->physical_pen = (float)$request->stat_physical_pen;
        if($request->has('stat_energy_pen')) $baseStats->energy_pen = (float)$request->stat_energy_pen;
        if($request->has('stat_max_health')) $baseStats->max_health = (float)$request->stat_max_health;
        if($request->has('stat_max_health_modifier')) $baseStats->max_health_modifier = (float)$request->stat_max_health_modifier;
        if($request->has('stat_health_regen')) $baseStats->health_regen = (float)$request->stat_health_regen;
        if($request->has('stat_health_regen_modifier')) $baseStats->health_regen_modifier = (float)$request->stat_health_regen_modifier;
        if($request->has('stat_max_mana')) $baseStats->max_mana = (float)$request->stat_max_mana;
        if($request->has('stat_max_mana_modifier')) $baseStats->max_mana_modifier = (float)$request->stat_max_mana_modifier;
        if($request->has('stat_mana_regen')) $baseStats->mana_regen = (float)$request->stat_mana_regen;
        if($request->has('stat_mana_regen_modifier')) $baseStats->mana_regen_modifier = (float)$request->stat_mana_regen_modifier;
        if($request->has('stat_lifesteal')) $baseStats->lifesteal = (float)$request->stat_lifesteal;
        if($request->has('stat_physical_armor')) $baseStats->physical_armor = (float)$request->stat_physical_armor;
        if($request->has('stat_physical_armor_modifier')) $baseStats->physical_armor_modifier = (float)$request->stat_physical_armor_modifier;
        if($request->has('stat_energy_armor')) $baseStats->energy_armor = (float)$request->stat_energy_armor;
        if($request->has('stat_energy_armor_modifier')) $baseStats->energy_armor_modifier = (float)$request->stat_energy_armor_modifier;
        if($request->has('stat_cooldown_reduction')) $baseStats->cooldown_reduction = (float)$request->stat_cooldown_reduction;
        if($request->has('stat_movement_speed')) $baseStats->movement_speed = (float)$request->stat_movement_speed;

        $hero->baseStats = $baseStats;
        $hero->save();

        session()->flash('notification', 'success|Hero saved.');

        return redirect('admin/heroes');
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
