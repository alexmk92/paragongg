@extends('layouts/app')
@section('body')
    <h2>Paragon cards</h2>
    <div id="card-feed"></div>
@endsection
@section('scripts')
    <script>
        var CARDS = {!! json_encode($cards) !!};
    </script>
@endsection
