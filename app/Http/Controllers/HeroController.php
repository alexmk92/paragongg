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
        return view('heroes.edit', compact('hero'));
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
        if($request->has('stat_physical_damage')) {
            $baseStats->physical_damage = array(
                "value" => (float) $request->stat_physical_damage,
                "scaling" => (float) $request->stat_physical_damage_scaling
            );
        }
        if($request->has('stat_energy_damage')) {
            $baseStats->energy_damage = array(
                "value" => (float) $request->stat_energy_damage,
                "scaling" => (float) $request->stat_energy_damage_scaling
            );
        }
        if($request->has('stat_crit_chance')) {
            $baseStats->crit_chance = array(
                "value" => (float) $request->stat_crit_chance,
                "scaling" => (float) $request->stat_crit_chance_scaling
            );
        }
        if($request->has('stat_crit_bonus')) {
            $baseStats->crit_bonus = array(
                "value" => (float) $request->stat_crit_bonus,
                "scaling" => (float) $request->stat_crit_bonus_scaling
            );
        }
        if($request->has('stat_attack_speed')) {
            $baseStats->attack_speed = array(
                "value" => (float) $request->stat_attack_speed,
                "scaling" => (float) $request->stat_attack_speed_scaling
            );
        }
        if($request->has('stat_physical_pen')) {
            $baseStats->physical_pen = array(
                "value" => (float) $request->stat_physical_pen,
                "scaling" => (float) $request->stat_physical_pen_scaling
            );
        }
        if($request->has('stat_energy_pen')) {
            $baseStats->energy_pen = array(
                "value" => (float) $request->stat_physical_pen,
                "scaling" => (float) $request->stat_physical_pen_scaling
            );
        }
        if($request->has('stat_max_health')) {
            $baseStats->max_health = array(
                "value" => (float) $request->stat_max_health,
                "scaling" => (float) $request->stat_max_health_scaling
            );
        }
        if($request->has('stat_health_regen')) {
            $baseStats->health_regen = array(
                "value" => (float) $request->stat_health_regen,
                "scaling" => (float) $request->stat_health_regen_scaling
            );
        }
        if($request->has('stat_max_mana')) {
            $baseStats->max_mana = array(
                "value" => (float) $request->stat_max_mana,
                "scaling" => (float) $request->stat_max_mana_scaling
            );
        }
        if($request->has('stat_mana_regen')) {
            $baseStats->mana_regen = array(
                "value" => (float) $request->stat_mana_regen,
                "scaling" => (float) $request->stat_mana_regen_scaling
            );
        }
        if($request->has('stat_lifesteal')) {
            $baseStats->lifesteal = array(
                "value" => (float) $request->stat_lifesteal,
                "scaling" => (float) $request->stat_lifesteal_scaling
            );
        }
        if($request->has('stat_physical_armor')) {
            $baseStats->physical_armor = array(
                "value" => (float) $request->stat_physical_armor,
                "scaling" => (float) $request->stat_physical_armor_scaling
            );
        }
        if($request->has('stat_energy_armor')) {
            $baseStats->energy_armor = array(
                "value" => (float) $request->stat_energy_armor,
                "scaling" => (float) $request->stat_energy_armor_scaling
            );
        }
        if($request->has('stat_cooldown_reduction')) {
            $baseStats->cooldown_reduction = array(
                "value" => (float) $request->stat_cooldown_reduction,
                "scaling" => (float) $request->stat_cooldown_reduction_scaling
            );
        }
        if($request->has('stat_movement_speed')) {
            $baseStats->movement_speed = array(
                "value" => (float) $request->stat_movement_speed,
                "scaling" => (float) $request->stat_movement_speed_scaling
            );
        }

        $videos = [];
        if($request->has('ability_video_lmb')) {
            $videos[0] = $request->ability_video_lmb;
        }

        if($request->has('ability_video_rmb')) {
            $videos[1] = $request->ability_video_rmb;
        }

        if($request->has('ability_video_q')) {
            $videos[2] = $request->ability_video_q;
        }

        if($request->has('ability_video_e')) {
            $videos[3] = $request->ability_video_e;
        }

        if($request->has('ability_video_ultimate')) {
            $videos[4] = $request->ability_video_ultimate;
        }

        $hero->videos = $videos;
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
}
