@extends('layouts/app')
@section('body')
    <div id="hero-wrapper">
        <div id="heroes-spinner">SPINNER COMPONENT HERE</div>
        <div id="hero-stats">STAT COMPONENT HERE</div>
    </div>
    <div id="graph-wrapper">GRAPH COMPONENT HERE</div>
    <div id="abilities">ABILITY COMPONENT HERE</div>
@endsection
@section('scripts')
    <script>
        var HEROES = {!! json_encode($heroes) !!}
        var HERO = {!! json_encode($hero) !!};
    </script>
@endsection
