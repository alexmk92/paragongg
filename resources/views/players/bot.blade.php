@extends('layouts/app')
@section('meta_tags')
    <meta name="description" content="User">
@endsection
@section('libraries')
    {{-- Is stream live --}}
    {{--@if($twitchLive && $user->twitch_tv)--}}
        {{--<script src= "http://player.twitch.tv/js/embed/v1.js"></script>--}}
    {{--@endif--}}
@endsection
@section('body')
    <div id="particle-wrapper" data-theme="embers"></div>
    <div class="impact-box cf">
        <h1 class="section-heading">Bot account</h1>
        <p>Sorry! This is an account associated with an Epic bot (Solo &amp; Coop vs AI games). As a result, we don't track its history or stats. If you believe this is in error, please let us know at <a href="mailto:support@paragon.gg">support@paragon.gg</a>.</p>
    </div>
@endsection
