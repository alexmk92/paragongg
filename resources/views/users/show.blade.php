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
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
            </ul>
        </div>
        <div class="listbox cf">
            <h5>Published decks</h5>
            <ul>
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
            </ul>
        </div>
        <div class="listbox cf">
            <h5>Recent discussion</h5>
            <ul>
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
                <li><a href="" class="cf">
                        <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                        <span class="details highlight">Question</span><span class="details">0 Responses</span>
                        <span class="content">What is the respawn time for ju...</span>
                    </a></li>
            </ul>
        </div>
    </div>

    <div class="user-profile">
        <div class="profile-banner" style="background-image: url(/assets/images/example-profile-banner.jpg)">
            <div class="text-wrapper">
                <div class="profile-username">
                    <img src="https://pbs.twimg.com/profile_images/465153219195187200/Wuga09xj_400x400.jpeg" class="user-avatar" />
                    <h3>jamieshepherd</h3>
                </div>
                <div class="profile-player">
                    <span><i class="fa fa-gamepad" aria-hidden="true"></i> <a href="/players/jamieshepherd">jamieshepherd</a> <i class="fa fa-check-circle" title="Account linked" aria-hidden="true"></i></span>
                </div>
            </div>
        </div>
        <div class="profile-bio">
            <h4>About me</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div class="profile-social-links">
                <a class="btn btn-faded btn-margin" href="/"><i class="fa fa-globe" aria-hidden="true"></i> Website</a>
                <a class="btn btn-faded" href="/"><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</a>
                <a class="btn btn-faded" href="/"><i class="fa fa-twitch" aria-hidden="true"></i> Twitch.TV</a>
                <a class="btn btn-faded" href="/"><i class="fa fa-reddit-alien" aria-hidden="true"></i> Reddit</a>
            </div>
        </div>
        <div class="profile-achievements">
            <h3>Achievements</h3>
            <div class="achievements-grid">
                <div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div><div class="achievement-preview locked"></div>
            </div>
        </div>
    </div>
@endsection
