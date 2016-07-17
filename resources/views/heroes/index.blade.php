@extends('layouts/app')
@section('title')
    Paragon Heroes -
@endsection
@section('body')
    <div id="heroes-feed"></div>
@endsection
@section('scripts')
    <script>
        var HEROES = {!! json_encode($heroes) !!};
    </script>
@endsection
