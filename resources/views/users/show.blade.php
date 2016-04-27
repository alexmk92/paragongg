@extends('layouts/app')
@section('body')
    <div id="sidebar">
        <div class="sidebox panel cf">
            <img class="user-avatar" src="https://pbs.twimg.com/profile_images/465153219195187200/Wuga09xj_400x400.jpeg">
            <span class="user-username">{{ $user->username }}</span>
             <span class="ign-handle">
                 {{-- <em>No account linked</em> <i class="fa fa-times-circle" aria-hidden="true" title="Linked account"></i> --}}
                 <i class="fa fa-user" aria-hidden="true"></i>
                 <strong>jamieshepherd <i class="fa fa-check-circle" aria-hidden="true" title="Linked account"></i></strong>
            </span>
        </div>
        <div class="sidebox panel cf">
            <h4>Bio</h4>
            <p><em>Computer Science final year student who's passionate about Paragon. Subreddit moderator whenever I have any time left.</em></p>
            <hr>
            <ul class="social">
                <li><i class="fa fa-globe" aria-hidden="true"></i> <a href="/">paragon.gg</a></li>
                <li><i class="fa fa-twitch" aria-hidden="true"></i> <a href="/">jamieshepherd</a></li>
                <li><i class="fa fa-twitter" aria-hidden="true"></i> <a href="/">jamieshepherd</a></li>
            </ul>
        </div>

    </div>
    <div id="player-stats">
        <h2>Player stats</h2>
        {{-- 300 WIDTH, 25 MARGIN --}}
        <div class="quick-stats">
            <div class="statbox small">
                <div class="content">
                    <span class="label">Win/Loss Ratio</span>
                    <span class="statistic">76%</span>
                </div>
            </div><div class="statbox small">
                <div class="content">
                    <span class="label">Games played</span>
                    <span class="statistic">126</span>
                </div>
            </div><div class="statbox small">
                <div class="content">
                    <span class="label">Total played</span>
                    <span class="statistic">513 hrs</span>
                </div>
            </div>
        </div>
        <h2>Match history</h2>
        <div id="game-feed">
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview loss cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="loss">Loss</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview loss cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="loss">Loss</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview loss cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="match-preview win cf">
                <div class="personal-stats">
                    <div class="match-overview">
                        <div class="dark">
                            <span class="win">Win</span>
                            2 HOURS AGO
                        </div><div class="dark">
                            <span class="emphasis">+17 MMR</span>
                        </div><div class="dark">
                            DURATION
                            <span class="emphasis">21:33</span>
                        </div><div class="dark">
                            TYPE
                            <span class="emphasis">PVP</span>
                        </div>
                    </div>
                    <img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg">
                    <div class="player-stats kda">
                        <span class="label">Murdock</span>
                        <span class="player-kda"><span class="player-kills">16</span>/<span class="player-deaths">0</span>/<span class="player-assists">10</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Creep score</span>
                        <span class="stat"><span class="emphasis">157</span></span>
                    </div>
                    <div class="player-stats">
                        <span class="label">Card power</span>
                        <span class="stat"><span class="emphasis">60</span> / 60</span>
                    </div>
                </div>
                <div class="team-overview">
                    <div class="team1 winner">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> jamieshepherd</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/muriel/portrait.jpg"> Laudran-</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> ninjaundercover</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/steel/portrait.jpg"> Slaykill</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/feng-mao/portrait.jpg"> SpleenGoblin</li>
                        </ul>
                    </div><div class="team2 loser">
                        <ul>
                            <li><img class="hero-portrait" src="/assets/images/heroes/sparrow/portrait.jpg"> munchies3</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/twinblast/portrait.jpg"> dewthegoat</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/kallari/portrait.jpg"> IamTissue</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/gideon/portrait.jpg"> Gemstone</li>
                            <li><img class="hero-portrait" src="/assets/images/heroes/murdock/portrait.jpg"> Slayer-UK</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
