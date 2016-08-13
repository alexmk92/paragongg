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
        <h3>Hero Epic Codename</h3>
        <input type="text" name="codename" @if(isset($hero->codename)) value="{{ $hero->codename }}" @endif>
        <h3>Hero ability videos</h3>
        <label>LMB</label>
        <input type="text" name="ability_video_lmb" @if(isset($hero->videos[0]))value="{{ $hero->abilities[0]['video'] }}"@endif>
        <label>RMB</label>
        <input type="text" name="ability_video_rmb" @if(isset($hero->videos[1]))value="{{ $hero->abilities[1]['video'] }}"@endif>
        <label>Q</label>
        <input type="text" name="ability_video_q" @if(isset($hero->videos[2]))value="{{ $hero->abilities[2]['video'] }}"@endif>
        <label>E</label>
        <input type="text" name="ability_video_e" @if(isset($hero->videos[3]))value="{{ $hero->abilities[3]['video'] }}"@endif>
        <label>Ultimate</label>
        <input type="text" name="ability_video_ultimate" @if(isset($hero->videos[4]))value="{{ $hero->abilities[4]['video'] }}"@endif>
        <hr>
        <h3>Hero Stats</h3><br>
        <label><i class="pgg pgg-max-health"></i> Max Health</label>
        <input type="text" name="stat_max_health" class="medium" value="{{ $hero->baseStats['max_health']['value'] or 0 }}">
        <input type="text" name="stat_max_health_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['max_health']['scaling'] or 0 }}">
        <label><i class="pgg pgg-max-mana"></i> Max Mana</label>
        <input type="text" name="stat_max_mana" class="medium" value="{{ $hero->baseStats['max_mana']['value'] or 0 }}">
        <input type="text" name="stat_max_mana_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['max_mana']['scaling'] or 0 }}">
        <label><i class="pgg pgg-health-regeneration"></i> Health Regen</label>
        <input type="text" name="stat_health_regen" class="medium" value="{{ $hero->baseStats['health_regen']['value'] or 0 }}">
        <input type="text" name="stat_health_regen_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['health_regen']['scaling'] or 0 }}">
        <label><i class="pgg pgg-mana-regeneration"></i> Mana Regen</label>
        <input type="text" name="stat_mana_regen" class="medium" value="{{ $hero->baseStats['mana_regen']['value'] or 0 }}">
        <input type="text" name="stat_mana_regen_scaling" class="short" placeholder="+p/level"  value="{{ $hero->baseStats['mana_regen']['scaling'] or 0 }}">
        <label><i class="pgg pgg-energy-armor"></i> Energy Armor</label>
        <input type="text" name="stat_energy_armor" class="medium" value="{{ $hero->baseStats['energy_armor']['value'] or 0 }}">
        <input type="text" name="stat_energy_armor_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['energy_armor']['scaling'] or 0 }}">
        <label><i class="pgg pgg-physical-armor"></i> Physical Armor</label>
        <input type="text" name="stat_physical_armor" class="medium" value="{{ $hero->baseStats['physical_armor']['value'] or 0 }}">
        <input type="text" name="stat_physical_armor_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['physical_armor']['scaling'] or 0 }}">
        <label><i class="pgg pgg-movement-speed"></i> Movement Speed</label>
        <input type="text" name="stat_movement_speed" class="medium" value="{{ $hero->baseStats['movement_speed']['value'] or 0 }}">
        <input type="text" name="stat_movement_speed_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['movement_speed']['scaling'] or 0 }}">
        <label><i class="pgg pgg-physical-damage"></i> Physical Damage (Default: 0)</label>
        <input type="text" name="stat_physical_damage" class="medium" value="{{ $hero->baseStats['physical_damage']['value'] or 0 }}">
        <input type="text" name="stat_physical_damage_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['physical_damage']['scaling'] or 0 }}">
        <label><i class="pgg pgg-energy-damage"></i> Energy Damage (Default: 0)</label>
        <input type="text" name="stat_energy_damage" class="medium" value="{{ $hero->baseStats['energy_damange']['value'] or 0 }}">
        <input type="text" name="stat_energy_damage_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['energy_damange']['scaling'] or 0 }}">
        <label><i class="pgg pgg-critical-strike-chance"></i> Crit Chance (Default: 0%)</label>
        <input type="text" name="stat_crit_chance" class="medium" value="{{ $hero->baseStats['crit_chance']['value'] or 0 }}">
        <input type="text" name="stat_crit_chance_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['crit_chance']['scaling'] or 0 }}">
        <label><i class="pgg pgg-critical-strike-bonus"></i> Crit Bonus (Default: 150%)</label>
        <input type="text" name="stat_crit_bonus" class="medium" value="{{ $hero->baseStats['crit_bonus']['value'] or 150 }}">
        <input type="text" name="stat_crit_bonus_scaling" class="short" placeholder="+p/level"  value="{{ $hero->baseStats['crit_bonus']['scaling'] or 0 }}">
        <label><i class="pgg pgg-attack-speed"></i> Attack Speed (Default: 100)</label>
        <input type="text" name="stat_attack_speed" class="medium" value="{{ $hero->baseStats['attack_speed']['value'] or 0 }}">
        <input type="text" name="stat_attack_speed_scaling" class="short" placeholder="+p/level"  value="{{ $hero->baseStats['attack_speed']['scaling'] or 0 }}">
        <label><i class="pgg pgg-physical-penetration"></i> Physical Pen (Default: 0)</label>
        <input type="text" name="stat_physical_pen" class="medium" value="{{ $hero->baseStats['physical_pen']['value'] or 0 }}">
        <input type="text" name="stat_physical_pen_scaling" class="short" placeholder="+p/level" value="{{ $hero->baseStats['physical_pen']['scaling'] or 0 }}">
        <label><i class="pgg pgg-energy-penetration"></i> Energy Pen (Default: 0)</label>
        <input type="text" name="stat_energy_pen" class="medium" value="{{ $hero->baseStats['energy_pen']['value'] or 0 }}">
        <input type="text" name="stat_energy_pen_scaling" class="short" placeholder="+p/level"  value="{{ $hero->baseStats['energy_pen']['scaling'] or 0 }}">
        <label><i class="pgg pgg-lifesteal"></i> Lifesteal (Default: 0)</label>
        <input type="text" name="stat_lifesteal" class="medium" value="{{ $hero->baseStats['lifesteal']['value'] or 0 }}">
        <input type="text" name="stat_lifesteal_scaling" class="short" placeholder="+p/level"  value="{{ $hero->baseStats['lifesteal']['scaling'] or 0 }}">
        <label><i class="pgg pgg-cooldown-reduction"></i> Cooldown Reduction (Default: 0%)</label>
        <input type="text" name="stat_cooldown_reduction" class="medium" value="{{ $hero->baseStats['cooldown_reduction']['value'] or 0 }}">
        <input type="text" name="stat_cooldown_reduction_scaling" class="short" placeholder="+p/level"  value="{{ $hero->baseStats['cooldown_reduction']['scaling'] or 0 }}">
        <hr>
        <button type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Save changes</button>
    </form>
@endsection
