@extends('layouts/app')
@section('body')
    <div id="cards-feed"></div>
@endsection
@section('scripts')
    <script>
        var CARDS = {!! json_encode($cards) !!};
        var AUTHED = {{ Auth::check() ? "true" : "false" }};
    </script>
@endsection
