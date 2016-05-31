@extends('layouts/app')
@section('body')
    <div id="heroes-feed"></div>
@endsection
@section('scripts')
    <script>
        var HEROES = {!! json_encode($heroes) !!};
    </script>
@endsection
