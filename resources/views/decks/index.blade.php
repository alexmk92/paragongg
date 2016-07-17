@extends('layouts/app')
@section('title')
    Paragon Decks -
@endsection
@section('scripts')
    <script type="text/javascript">
        var csrf   = '{{ csrf_token() }}';
        var AUTHED = '{{ Auth::check() }}';
        var DECKS  = {!! json_encode($decks) !!};
        var HEROES = {!! json_encode($heroes) !!};
        var HERO   = {!! json_encode($hero) !!}
    </script>
@endsection
@section('body')
    <div id="sidebar">
        <div class="sidebox panel">
            <h4>Create a deck</h4>
            <p>Creating a deck for Paragon.gg is quick and easy, and will allow you to show the community the cards you use in Paragon.</p>
            <a class="btn btn-primary btn-margin" href="/decks/create">Build a deck</a>
        </div>
        <div class="sidebox panel">
            <h4>Suggested decks</h4>
            <div id="suggested-decks"></div>
        </div>
    </div>
    <div class="wrapper">
        <h2>Paragon decks</h2>
        <div id="decks-feed"></div>
    </div>
@endsection
