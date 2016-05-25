@extends('layouts/app')
@section('body')
    <div id="hero-wrapper">
    </div>
    <div id="graph-wrapper">GRAPH COMPONENT HERE</div>
    <div id="abilities-wrapper">ABILITY COMPONENT HERE</div>
@endsection
@section('scripts')
    <script type="text/javascript">
        var HEROES = {!! json_encode($heroes) !!};
        var HERO = {!! json_encode($hero) !!};
    </script>
@endsection
