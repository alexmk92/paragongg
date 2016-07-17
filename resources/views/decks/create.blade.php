@extends('layouts/app')
@section('title')
    Deck Builder -
@endsection
@section('body')
    <div id="deck-builder"></div>
@endsection
@section('scripts')
    <script>
        @if(Auth::check() && Auth::user()->oauth_epic_code != null)
            var AUTHED = true;
        @else
            var AUTHED = false;
        @endif

        var rawCards = {!! json_encode($cards) !!};
        var HEROES = {!! json_encode($heroes) !!};
        var USER_ID = {{ $userId }};

        var csrf = '{{ csrf_token() }}';

        // TODO We should probably run this filter on the server...
        var CARDS = {
            passives : [], // zero - FROM API
            actives: [], // one - FROM API
            upgrades: [], // two - FROM API
            primeHelixes : [], // three - FROM API
            allCards : rawCards
        };
         rawCards.map(function(card) {
            switch(card.type.toUpperCase()) {
                case "ZERO": CARDS.passives.push(card); break;
                case "ONE" : CARDS.actives.push(card); break;
                case "TWO" : CARDS.upgrades.push(card); break;
                case "THREE" : CARDS.primeHelixes.push(card); break;
                default : break;
            }
        });
    </script>
@endsection
