@extends('layouts/app')
@section('body')
    <div class="featured-panel">

        <div class="panel-wrapper first">
            <a class="unique" href="/news/slug">
            <div class="featured-focus">
                <div class="overlay">
                    <div class="date">08 April</div>
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
                            </span>
                        </div>
                        <span class="latest-subheader"><a href="/">New updates brings early private matches</a></span>
                        <span class="post-details">Posted by <a href="">&#64;Jamie</a> 13 hours ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                            </span>
                        </div>
                        <span class="latest-subheader"><a href="/">Sevarog mastery skin revealed</a></span>
                        <span class="post-details">Posted by <a href="">&#64;Facerafter</a> 4 days ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                            </span>
                        </div>
                        <span class="latest-subheader"><a href="/">Play Sevarog - Patch notes - 29 March</a></span>
                        <span class="post-details">Posted by <a href="">&#64;Shuu</a> 6 days ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                            </span>
                        </div>
                        <span class="latest-subheader">Paragon Tier List - March 2016</span>
                        <span class="post-details">Posted by <a href="">&#64;Jamie</a> 1 week ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <span class="date-day">18</span>
                            <span class="date-month">Mar</span>
                            </span>
                        </div>
                        <span class="latest-subheader">Epic Teases Upcoming Hero Sevarog - "Soon."</span>
                        <span class="post-details">Posted by <a href="">&#64;Jamie</a> 1 week ago</span>
                    </li>
                </ul>
            </div>
            <div class="featured-list featured-guides">
                <div class="subheading">Recent discussion</div>
                <ul class="latest-list">
                    <li>
                        <div class="post-context">
                            <img src="https://randomuser.me/api/portraits/women/21.jpg">
                        </div>
                        <span class="latest-subheader">Does anyone think that Paragon is too hard</span>
                        <span class="post-details">Posted by <a href="">&#64;Renee</a> 13 hours ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <img src="https://randomuser.me/api/portraits/women/80.jpg">
                        </div>
                        <span class="latest-subheader">Get rid of travel mode</span>
                        <span class="post-details">Posted by <a href="">&#64;Isobel</a> 4 days ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <img src="https://randomuser.me/api/portraits/men/88.jpg">
                        </div>
                        <span class="latest-subheader">Play Sevarog - Patch notes - 29 March</span>
                        <span class="post-details">Posted by <a href="">&#64;Charlie</a> 6 days ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <img src="https://randomuser.me/api/portraits/women/67.jpg">
                        </div>
                        <span class="latest-subheader">Paragon Tier List - March 2016</span>
                        <span class="post-details">Posted by <a href="">&#64;Catherine</a> 1 week ago</span>
                    </li>
                    <li>
                        <div class="post-context">
                            <img src="https://randomuser.me/api/portraits/men/15.jpg">
                        </div>
                        <span class="latest-subheader">Paragon Tier List - March 2016</span>
                        <span class="post-details">Posted by <a href="">&#64;Phillip</a> 1 week ago</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="featured-guides">

        </div>
    </div>
    <div class="secondary-panel">
        <div class="panel-wrapper first">
            <div id="stats-overview"></div>
        </div><div class="panel-wrapper">
            <div>
                <div class="subheading">Featured guides</div>
                <div class="guide-preview cf">
                    <div class="mini-build">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/madstone-gem_570510ba84015.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/injured-rage_56fc72bec47f9.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/stasis-gem_57050d586f7d3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/barrier-of-will_56fe6a26a619c.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/executioners-key_5705a5321f4c3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/amp-crystal_570517b3384fe.png">
                    </div>
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/sparrow_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">The Ultimate Sparrow Guide So Good Omg please</a></span>
                    <span class="post-details">Posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="guide-preview cf">
                    <div class="mini-build">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/madstone-gem_570510ba84015.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/injured-rage_56fc72bec47f9.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/stasis-gem_57050d586f7d3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/barrier-of-will_56fe6a26a619c.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/executioners-key_5705a5321f4c3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/amp-crystal_570517b3384fe.png">
                    </div>
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/sparrow_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">The Ultimate Sparrow Guide</a></span>
                    <span class="post-details">Posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="guide-preview cf">
                    <div class="mini-build">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/madstone-gem_570510ba84015.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/injured-rage_56fc72bec47f9.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/stasis-gem_57050d586f7d3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/barrier-of-will_56fe6a26a619c.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/executioners-key_5705a5321f4c3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/amp-crystal_570517b3384fe.png">
                    </div>
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/sparrow_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">The Ultimate Sparrow Guide</a></span>
                    <span class="post-details">Posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="guide-preview cf">
                    <div class="mini-build">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/madstone-gem_570510ba84015.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/injured-rage_56fc72bec47f9.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/stasis-gem_57050d586f7d3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/barrier-of-will_56fe6a26a619c.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/executioners-key_5705a5321f4c3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/amp-crystal_570517b3384fe.png">
                    </div>
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/sparrow_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">The Ultimate Sparrow Guide</a></span>
                    <span class="post-details">Posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="guide-preview cf">
                    <div class="mini-build">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/madstone-gem_570510ba84015.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/injured-rage_56fc72bec47f9.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/stasis-gem_57050d586f7d3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/barrier-of-will_56fe6a26a619c.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/executioners-key_5705a5321f4c3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/amp-crystal_570517b3384fe.png">
                    </div>
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/sparrow_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">The Ultimate Sparrow Guide</a></span>
                    <span class="post-details">Posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
                <div class="guide-preview cf">
                    <div class="mini-build">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/madstone-gem_570510ba84015.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/injured-rage_56fc72bec47f9.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/stasis-gem_57050d586f7d3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/barrier-of-will_56fe6a26a619c.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/executioners-key_5705a5321f4c3.png">
                        <img src="https://s3-eu-west-1.amazonaws.com/paragongg/database/cards/thumbnails/amp-crystal_570517b3384fe.png">
                    </div>
                    <div class="hero-icon">
                        <img src="https://paragon.gg/images/strategy/sparrow_icon.jpg"/>
                    </div>
                    <span class="guide-title"><a href="/">The Ultimate Sparrow Guide</a></span>
                    <span class="post-details">Posted by <a href="">&#64;Facerafter</a> 3 weeks ago</span>
                </div>
            </div>

        </div>
    </div>
@endsection
