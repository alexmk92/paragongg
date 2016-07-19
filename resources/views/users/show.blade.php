@extends('layouts/app')
@section('libraries')
    {{-- Is stream live --}}
    @if($twitchLive && $user->twitch_tv)
        <script src= "http://player.twitch.tv/js/embed/v1.js"></script>
    @endif
@endsection
@section('body')
    <div id="sidebar">
        <div class="listbox cf">
            <h5>Published guides</h5>
            <ul>
                @if($guides->count() == 0)
                    <p>This user has not yet published any guides.</p>
                @else
                    @foreach($guides as $guide)
                    <li><a href="/guides/{{$guide->id}}/{{$guide->slug}}" class="cf">
                            @if($guide->type == 'hero')
                                <img src="{{ S3URL()}}/images/heroes/{{ $guide->hero_code }}/{{ $guide->hero->image }}/portrait_small.png" class="user-avatar"/>
                            @else
                                <img src="/assets/images/heroes/null.png" class="user-avatar"/>
                            @endif
                            <span class="details highlight">{{ $guide->type }} guide</span><span class="details">{{ $guide->views }} Views</span>
                            <span class="content">{{ $guide->title }}</span>
                        </a></li>
                    @endforeach
                @endif
            </ul>
        </div>
        <div class="listbox cf">
            <h5>Published decks</h5>
            <ul>
                @if($decks->count() == 0)
                    <p>This user has not yet built any decks.</p>
                @else
                    @foreach($decks as $deck)
                        <li><a href="/decks/{{$deck->id}}/{{$deck->slug}}" class="cf">
                                <img src="{{ S3URL()}}/images/heroes/{{ $deck->hero['code'] }}/{{ $deck->hero['image'] }}/portrait_small.png" class="user-avatar"/>
                                <span class="details highlight">{{ $deck->hero['name'] }} deck</span><span class="details">{{ $deck->views }} Views</span>
                                <span class="content">{{ $deck->title }}</span>
                            </a></li>
                    @endforeach
                @endif
            </ul>
        </div>
        {{--<div class="listbox cf">--}}
            {{--<h5>Recent discussion</h5>--}}
            {{--<ul>--}}
                {{--<li><a href="" class="cf">--}}
                        {{--<img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>--}}
                        {{--<span class="details highlight">Question</span><span class="details">0 Responses</span>--}}
                        {{--<span class="content">What is the respawn time for ju...</span>--}}
                    {{--</a></li>--}}
                {{--<li><a href="" class="cf">--}}
                        {{--<img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>--}}
                        {{--<span class="details highlight">Question</span><span class="details">0 Responses</span>--}}
                        {{--<span class="content">What is the respawn time for ju...</span>--}}
                    {{--</a></li>--}}
                {{--<li><a href="" class="cf">--}}
                        {{--<img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>--}}
                        {{--<span class="details highlight">Question</span><span class="details">0 Responses</span>--}}
                        {{--<span class="content">What is the respawn time for ju...</span>--}}
                    {{--</a></li>--}}
            {{--</ul>--}}
        {{--</div>--}}
    </div>

    <div class="user-profile">
        <div class="profile-banner" style="background-image: url(/assets/images/users/default-banner.jpg)">
            <div class="text-wrapper">
                <div class="profile-username">
                    <img src="{{getAvatar($user)}}" class="user-avatar" />
                    <h3>{{ $user->username }}</h3>
                </div>
                {{--<div class="profile-player">--}}
                    {{--<span><i class="fa fa-gamepad" aria-hidden="true"></i> <a href="/players/jamieshepherd">jamieshepherd</a> <i class="fa fa-check-circle" title="Account linked" aria-hidden="true"></i></span>--}}
                {{--</div>--}}
            </div>
        </div>
        <div class="profile-bio">
            <h4>About me</h4>
            @if(!$user->bio)
                <p>This user has not completed their profile yet.</p>
            @else
                <p>{{ $user->bio }}</p>
            @endif
            <div class="profile-social-links">
                @if($user->website)
                    <a class="btn btn-faded btn-margin" href="{{ $user->website }}"><i class="fa fa-globe" aria-hidden="true"></i> Website</a>
                @endif
                @if($user->twitter)
                    <a class="btn btn-faded btn-margin" href="https://twitter.com/{{ $user->twitter }}"><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</a>
                @endif
                @if($user->twitch_tv)
                    <a class="btn btn-faded btn-margin" href="https://www.twitch.tv/{{ $user->twitch_tv }}"><i class="fa fa-twitch" aria-hidden="true"></i> Twitch.TV</a>
                @endif
                @if($user->reddit)
                    <a class="btn btn-faded btn-margin" href="https://reddit.com/u/{{ $user->reddit }}"><i class="fa fa-reddit-alien" aria-hidden="true"></i> Reddit</a>
                @endif
            </div>
        </div>
        {{--<div class="profile-achievements">--}}
            {{--<h3>Achievements</h3>--}}
            {{--<div class="achievements-grid">--}}
                {{--<div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div>--}}
            {{--</div>--}}
        {{--</div>--}}
    </div>
@endsection
