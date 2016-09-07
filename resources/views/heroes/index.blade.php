@extends('layouts/app')
@section('title')
    Paragon Heroes -
@endsection
@section('meta_tags')
    <meta name="description" content="A complete listing of all heroes and stats in Paragon, the MOBA from Epic Games. Powered by the Paragon API.">
@endsection
@section('body')
    <div id="heroes-feed"></div>
@endsection
@section('scripts')
    <script>
        var HEROES = {!! json_encode($heroes) !!};
    </script>
@endsection
