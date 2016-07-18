@extends('layouts/app')
@section('title')
    {{ $hero->name }} -
@endsection
@section('body')
    <div id="hero-wrapper"></div>
@endsection
@section('scripts')
    <script type="text/javascript" src="/js/lib/gfycat.min.js"></script>
    <script type="text/javascript">
        var HERO = {!! json_encode($hero) !!};
    </script>
@endsection
