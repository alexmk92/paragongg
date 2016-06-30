@extends('layouts/app')
@section('body')
    <div id="cards-feed"></div>
@endsection
@section('scripts')
    <script>
        var CARDS = {!! json_encode($cards) !!};

        @if(Auth::check() && Auth::user()->oauth_epic_code != null)
            var AUTHED = true;
        @else
            var AUTHED = false;
        @endif
    </script>
@endsection
