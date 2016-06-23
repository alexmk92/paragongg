@extends('layouts/app')
@section('body')
    <span class="breadcrumb"><a href="/heroes/{{ $hero->slug }}">{{ $hero->name }}</a> / <a href="/heroes/edit/{{ $hero->code }}">Edit</a></span>
    <h2>Edit a hero</h2>
    <form role="form" method="POST" action="{{ Request::url() }}" enctype="multipart/form-data">
        {!! csrf_field() !!}
        <label>Upload new hero background</label>
        <input name="background" type="file">

        <label>Upload new hero cutout</label>
        <input name="cutout" type="file">
        <hr>
        <h3>Hero Stats</h3>
        <label>Max Health</label>
        <input type="text" name="stat_max_health" value="{{ $hero->baseStats['max_health'] or '' }}">
        <input type="text" name="stat_max_health_modifier" class="short" placeholder="+per level" value="{{ $hero->baseStats['max_health_modifier'] or '' }}"><span class="sublabel">(Per Level)</span>
        <label>Max Mana</label>
        <input type="text" name="stat_max_mana" value="{{ $hero->baseStats['max_mana'] or '' }}">
        <input type="text" name="stat_max_mana_modifier" class="short" placeholder="+per level" value="{{ $hero->baseStats['max_mana_modifier'] or '' }}"><span class="sublabel">(Per Level)</span>
        <label>Health Regen</label>
        <input type="text" name="stat_health_regen" value="{{ $hero->baseStats['health_regen'] or '' }}">
        <input type="text" name="stat_health_regen_modifier" class="short" placeholder="+per level" value="{{ $hero->baseStats['health_regen_modifier'] or '' }}"><span class="sublabel">(Per Level)</span>
        <label>Mana Regen</label>
        <input type="text" name="stat_mana_regen" value="{{ $hero->baseStats['mana_regen'] or '' }}">
        <input type="text" name="stat_mana_regen_modifier" class="short" placeholder="+per level" value="{{ $hero->baseStats['mana_regen_modifier'] or '' }}"><span class="sublabel">(Per Level)</span>
        <label>Energy Armor</label>
        <input type="text" name="stat_energy_armor" value="{{ $hero->baseStats['energy_armor'] or '' }}">
        <input type="text" name="stat_energy_armor_modifier" class="short" placeholder="+per level" value="{{ $hero->baseStats['energy_armor_modifier'] or '' }}"><span class="sublabel">(Per Level)</span>
        <label>Physical Armor</label>
        <input type="text" name="stat_physical_armor" value="{{ $hero->baseStats['physical_armor'] or '' }}">
        <input type="text" name="stat_physical_armor_modifier" class="short" placeholder="+per level" value="{{ $hero->baseStats['physical_armor_modifier'] or '' }}"><span class="sublabel">(Per Level)</span>
        <label>Movement Speed</label>
        <input type="text" name="stat_movement_speed" value="{{ $hero->baseStats['movement_speed'] or '' }}">
        <hr>
        <label>Physical Damage (Default: 0)</label>
        <input type="text" name="stat_physical_damage" value="0" value="{{ $hero->baseStats['physical_damage'] or '' }}">
        <label>Energy Damage (Default: 0)</label>
        <input type="text" name="stat_energy_damage" value="0" value="{{ $hero->baseStats['energy_damage'] or '' }}">
        <label>Crit Chance (Default: 0%)</label>
        <input type="text" name="stat_crit_chance" value="0" value="{{ $hero->baseStats['crit_chance'] or '' }}">
        <label>Crit Bonus (Default: 150%)</label>
        <input type="text" name="stat_crit_bonus" value="150" value="{{ $hero->baseStats['crit_bonus'] or '' }}">
        <label>Attack Speed (Default: 100)</label>
        <input type="text" name="stat_attack_speed" value="100" value="{{ $hero->baseStats['attack_speed'] or '' }}">
        <label>Physical Pen (Default: 0)</label>
        <input type="text" name="stat_physical_pen" value="0" value="{{ $hero->baseStats['physical_pen'] or '' }}">
        <label>Energy Pen (Default: 0)</label>
        <input type="text" name="stat_energy_pen" value="0" value="{{ $hero->baseStats['energy_pen'] or '' }}">
        <label>Lifesteal (Default: 0)</label>
        <input type="text" name="stat_lifesteal" value="0" value="{{ $hero->baseStats['lifesteal'] or '' }}">
        <label>Cooldown Reduction (Default: 0%)</label>
        <input type="text" name="stat_cooldown_reduction" value="0" value="{{ $hero->baseStats['stat_cooldown_reduction'] or '' }}">
        <hr>
        <button type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Save changes</button>
    </form>
@endsection
