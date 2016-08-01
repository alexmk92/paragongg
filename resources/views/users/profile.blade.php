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
        <h1>jamieshepherd <span class="verified" title="This user has linked their Epic account"><i class="fa fa-check-circle" aria-hidden="true"></i></span></h1>
        <div class="bio">
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.</p>
        <ul class="social">
            <li><a href="https://twitter.com/jamiesheep"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
            <li><a href="https://twitch.tv/jamieshepherd"><i class="fa fa-twitch" aria-hidden="true"></i></a></li>
            <li><a href="http://jamie.sh"><i class="fa fa-globe" aria-hidden="true"></i></a></li>
        </ul>
        </div>
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
                <ul>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview loss">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="loss">Loss</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    <li>
                        <a href="/tmatches/51345f1kk" class="match-preview win">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">21</span>/<span class="deaths">2</span>/<span class="assists">11</span>
                                    </td>
                                    <td>
                                        <span class="tag"><span class="win">Win</span>2 Hours Ago</span>
                                        <span class="tag"><span class="label">Duration</span>21:33</span>
                                        <span class="tag"><span class="label">Match mode</span>PVP</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
@endsection
