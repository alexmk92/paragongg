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
    <div class="user-profile">
        <header>
        <span class="subheading">Player profile</span>
        <h1>{{ $player->getUsername() }} @if($user)<span class="verified" title="This user has linked their Epic account"><i class="fa fa-check-circle" aria-hidden="true"></i></span>@endif</h1>
        @if($user)
        <div class="bio">
            @if($user->bio)
            <p>{{ $user->bio }}</p>
            @else
            <p>This user has not completed their profile yet.</p>
            @endif
            <ul class="social">
            @if($user->twitter)
            <li><a href="https://twitter.com/{{ $user->twitter }}"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
            @endif
            @if($user->twitch_tv)
            <li><a href="https://twitch.tv/{{ $user->twitch_tv }}"><i class="fa fa-twitch" aria-hidden="true"></i></a></li>
            @endif
            @if($user->website)
            <li><a href="{{ $user->website }}"><i class="fa fa-globe" aria-hidden="true"></i></a></li>
            @endif
            </ul>
        </div>
        @endif
        </header>
        <div id="sidebar">
            <div class="sidebox cf">
                <h3>Seasonal stats</h3>
                <ul class="stat-list">
                    <li>
                        <label>Total playtime</label>
                        <span>100 hours, 26 minutes</span>
                    </li>
                    <li>
                        <label>Global win / loss ratio</label>
                        <span>69% <span class="faded">(132 - 58)</span></span>
                    </li>
                    <li>
                        <label>Global KDA (Kill / Death / Assist)</label>
                        <span>2.9:1 <span class="faded">(1484 / 750 / 1351)</span></span>
                    </li>
                    <li>
                        <label>Towers Destroyed</label>
                        <span>318 <span class="faded">(1.28/game)</span></span>
                    </li>
                </ul>
            </div>
            <div class="sidebox cf">
                <h3>Hero stats</h3>
                <ul class="stat-list">
                    <li>
                        <label>Murdock</label>
                        <div class="completion-bar">
                            <div class="completed" style="width: 72%;"></div>
                            <span><strong>72%</strong> (58W / 8L)</span>
                        </div>
                    </li>
                    <li>
                        <label>Steel</label>
                        <div class="completion-bar">
                            <div class="completed" style="width: 68%;"></div>
                            <span><strong>68%</strong> (58W / 8L)</span>
                        </div>
                    </li>
                    <li>
                        <label>Kallari</label>
                        <div class="completion-bar">
                            <div class="completed" style="width: 64%;"></div>
                            <span><strong>64%</strong> (58W / 8L)</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="wrapper">
            <div class="match-history">
            <h3>Match history</h3>
                <div id="match-feed"></div>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <script type="text/javascript">
        var pId = '{{ $player->accountId }}';
    </script>
@endsection