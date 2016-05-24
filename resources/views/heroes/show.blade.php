@extends('layouts/app')
@section('body')
    <div id="hero-wrapper" style="background: url('/assets/hero/{{ strtolower($hero->name) }}/terrain.jpg') no-repeat; background-size: contain;">
        <div id="heroes-spinner">SPINNER COMPONENT HERE</div>
        <div id="left-wrapper">
            <div id="hero-stats">STAT COMPONENT HERE</div>
            <div id="blur-layer"></div>
        </div>
        <div id="particle-layer"></div>
        <div id="hero-model-wrapper">
            <div id="hero-model">
                <img src="{!! $heroModel !!}" />
                <div id="blur"></div>
            </div>
        </div>
    </div>
    <div id="graph-wrapper">GRAPH COMPONENT HERE</div>
    <div id="abilities-wrapper">ABILITY COMPONENT HERE</div>
@endsection
@section('scripts')
    <script type="text/javascript">
        var HEROES = {!! json_encode($heroes) !!}
        var HERO = {!! json_encode($hero) !!};
    </script>
@endsection
