@extends('layouts/app')
@section('title')
    {{ $hero->name }} -
@endsection
@section('meta_tags')
<meta property="og:image" content="{{ S3URL() }}/images/heroes/{{ $hero->code }}/{{ $hero->image }}/portrait_small.png" />
    <meta name="thumbnail" content="{{ S3URL() }}/images/heroes/{{ $hero->code }}/{{ $hero->image }}/portrait_small.png" />
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
