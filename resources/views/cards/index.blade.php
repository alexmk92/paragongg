@extends('layouts/app')
@section('title')
    Paragon Cards -
@endsection
@section('meta_tags')
    <meta name="description" content="A complete listing of all cards and stats in Paragon, the MOBA from Epic Games. Powered by the Paragon API.">
@endsection
@section('body')
    <div id="cards-feed"></div>
@endsection
@section('scripts')
    <script>
        var CARDS = {!! json_encode($cards) !!};

        @if(Auth::check() && Auth::user()->epic_account_id != null)
            var AUTHED = true;
        @else
            var AUTHED = false;
        @endif
    </script>
@endsection
