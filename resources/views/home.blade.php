@extends('layouts/app')
@section('body')
    <div class="featured-panel">

        <div class="panel-wrapper first">
            <a class="unique" href="/news/iggy-and-scorch-release-date-announced">
                <div class="featured-focus">
                    <div class="overlay">
                        <div class="date">6 Hours Ago</div>
                        <div class="heading"><h2>Iggy & Scorch Coming April 21</h2></div>
                        <span class="snippet">
                            Here’s a little bit of fluff text about Iggy & Scorch, the newest heroes to come to Paragon. Turns out they’re really powerful, and are good and stuff...
                        </span>
                    </div>
                </div>
            </a>
        </div><div class="panel-wrapper">
            <div class="featured-list latest-news">
                <div class="subheading">Latest news</div>
                <ul class="latest-list">
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                        </div>
                        <span class="latest-subheader"><a href="/">Updates brings early private matches</a></span>
                        <span class="post-details">Posted by <a href="">&#64;Jamie</a> 13 hours ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                        </div>
                        <span class="latest-subheader"><a href="/">Sevarog mastery skin revealed</a></span>
                        <span class="post-details">Posted by <a href="">&#64;Facerafter</a> 4 days ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                        </div>
                        <span class="latest-subheader"><a href="/">Play Sevarog - Patch notes - 29 March</a></span>
                        <span class="post-details">Posted by <a href="">&#64;Shuu</a> 6 days ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                        </div>
                        <span class="latest-subheader">Paragon Tier List - March 2016</span>
                        <span class="post-details">Posted by <a href="">&#64;Jamie</a> 1 week ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                        </div>
                        <span class="latest-subheader">Epic Teases Upcoming Hero Sevarog</span>
                        <span class="post-details">Posted by <a href="">&#64;Jamie</a> 1 week ago</span>
                    </li>
                </ul>
            </div>

            <div class="featured-list popular-decks">
                <div class="subheading">Popular decks</div>
                <a href="/">
                    <div class="deck-preview" style="background-image: url('/assets/images/heroes/murdock/deck-preview.jpg');">
                        <div class="stars-rating">
                            <i class="fa fa-star" aria-hidden="true"></i> 710
                        </div>
                        <div class="underlay">
                            <span class="latest-subheader">Beeckon's murdock deck</span>
                            <span class="post-details">Posted by <span class="emphasis">&#64;Beeckon</span> 1 week ago</span>
                        </div>
                    </div>
                </a>
                <a href="/">
                    <div class="deck-preview" style="background-image: url('/assets/images/heroes/feng-mao/deck-preview.jpg');">
                        <div class="stars-rating">
                            <i class="fa fa-star" aria-hidden="true"></i> 397
                        </div>
                        <div class="underlay">
                            <span class="latest-subheader">One with the wind - Feng Mao AS Deck</span>
                            <span class="post-details">Posted by <span class="emphasis">&#64;Jamie</span> 1 week ago</span>
                        </div>
                    </div>
                </a>
                <a href="/">
                    <div class="deck-preview" style="background-image: url('/assets/images/heroes/sparrow/deck-preview.jpg');">
                        <div class="stars-rating">
                            <i class="fa fa-star" aria-hidden="true"></i> 210
                        </div>
                        <div class="underlay">
                            <span class="latest-subheader">Critical Sparrow Deck</span>
                            <span class="post-details">Posted by <span class="emphasis">&#64;Andhoth</span> 13 hours aog</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>

    <div class="secondary-panel">
        <div class="panel-wrapper first">
            <div id="stats-overview"></div>
        </div><div class="panel-wrapper">
            <div>
                <div class="subheading">Featured guides</div>
                <div class="home-guide-preview cf" style="background-image: url('/assets/images/heroes/sparrow/cutout-small.png');">
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/sparrow_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">The Ultimate Sparrow Guide So Good</a></span>
                    <span class="post-details"><span class="category">Sparrow guide</span> posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="home-guide-preview cf" style="background-image: url('/assets/images/heroes/kallari/cutout-small.png');">
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/kallari_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">I am the night; how to become the hero gotham deserves</a></span>
                    <span class="post-details"><span class="category">Kallari guide</span> posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="home-guide-preview cf" style="background-image: url('/assets/images/heroes/twinblast/cutout-small.png');">
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/twinblast_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">Easy Twinblast Guide</a></span>
                    <span class="post-details"><span class="category">Twinblast guide</span> posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="home-guide-preview cf" style="background-image: url('/assets/images/heroes/feng-mao/cutout-small.png');">
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/feng-mao_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">Tank / Crit Jungler</a></span>
                    <span class="post-details"><span class="category">Feng-mao guide</span> posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="home-guide-preview cf" style="background-image: url('/assets/images/heroes/steel/cutout-small.png');">
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/steel_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">Steel "The Legendary Shield"</a></span>
                    <span class="post-details"><span class="category">Steel guide</span> posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="home-guide-preview cf" style="background-image: url('/assets/images/heroes/rampage/cutout-small.png');">
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/rampage_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">Rampage: The bush tank</a></span>
                    <span class="post-details"><span class="category">Rampage guide</span> posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
            </div>

        </div>
    </div>
@endsection
