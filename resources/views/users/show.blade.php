@extends('layouts/app')
@section('libraries')
    {{-- Is stream live --}}
    @if($twitchLive && $user->twitch_tv)
        <script src= "http://player.twitch.tv/js/embed/v1.js"></script>
    @endif
@endsection
@section('body')
    <div id="sidebar">
        <div class="sidebox panel cf">
            Panel
        </div>
    </div>

    <div class="user-profile">
        Soon
        {{--<div class="profile-banner" style="background-image: url(/assets/images/example-profile-banner.jpg)">--}}
            {{--<div class="text-wrapper">--}}
                {{--<div class="profile-username">--}}
                    {{--<img src="https://pbs.twimg.com/profile_images/465153219195187200/Wuga09xj_400x400.jpeg" class="user-avatar" />--}}
                    {{--<h3>jamieshepherd</h3>--}}
                {{--</div>--}}
                {{--<div class="profile-player">--}}

                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}
@endsection
