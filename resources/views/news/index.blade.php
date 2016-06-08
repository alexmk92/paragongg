@extends('layouts/app')
@section('body')
    <div id="news-hero-banner"></div>
    <div id="news-feed"></div>
@endsection
@section('scripts')
    <script>
        var FEATURED = {!! json_encode($featured) !!};
    </script>
@endsection