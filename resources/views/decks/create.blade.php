@extends('layouts/app')
@section('body')
    <div id="deck-builder"></div>
@endsection
@section('scripts')
    <script>
        var HEROES = {!! json_encode($heroes) !!};
        var CARDS = {!! json_encode($cards) !!};
        @if(Auth::check() && Auth::user()->oauth_epic_code != null)
            var AUTHED = true;
        @else
            var AUTHED = false;
        @endif
    </script>
@endsection
