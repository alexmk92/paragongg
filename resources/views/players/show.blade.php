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
                <ul>
                    @if($matches->count() === 0)
                        <p>This user is yet to play any games this season.</p>
                    @endif
                    @foreach($matches as $match)
                    <li>
                        <a href="/tmatches/{{ $match->replayId }}" class="match-preview {{ ($match->playerStats['team'] == $match->winningTeam) ? 'win' : 'lose' }}">
                            <table>
                                <tr>
                                    <td class="hero-played">
                                        <img src="https://s3.amazonaws.com/paragongg-us/images/heroes/350982a548a16ce00215b04dbe62a0b1/C0BC54435DE7CB366AD33F10BCDB18616882819D/portrait_small.png"/>
                                    </td>
                                    <td class="kda">
                                        <span class="kills">{{ $match->playerStats['kills'] }}</span>/<span class="deaths">{{ $match->playerStats['deaths'] }}</span>/<span class="assists">{{ $match->playerStats['assists'] }}</span>
                                    </td>
                                    <td>
                                        <span class="tag">
                                            @if($match->playerStats['team'] == $match->winningTeam)
                                                <span class="win">Win</span>
                                            @else
                                                <span class="loss">Loss</span>
                                            @endif
                                                {{ getMongoDiff($match->startedAt) }}</span>
                                        <span class="tag"><span class="label">Duration</span>{{ getMatchLength($match) }}</span>
                                        <span class="tag"><span class="label">Match mode</span>{{ str_replace('_', ' ', $match->gameType) }}</span>
                                    </td>
                                    <td class="final">
                                        <span class="btn btn-faded"><i class="fa fa-play-circle" aria-hidden="true"></i> View match</span>
                                    </td>
                                </tr>
                            </table>
                        </a>
                    </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <script type="text/javascript">
        var pId = '{{ $player->accountId }}';
    </script>
@endsection