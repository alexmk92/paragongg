@extends('layouts/app')
@section('body')
    <div class="featured-wrapper">
        <div class="featured-panel-wrapper">
            <a href="/heroes/gadget" class="featured-panel" style="background-image:url(/assets/example-panel1.jpg);">
                <div class="panel-title">
                    <span class="highlight">Featured Hero</span>
                    <h4>Gadget</h4>
                </div>
            </a>
            <a href="/cards/reptilian-claw" class="featured-panel" style="background-image:url(/assets/example-panel2.jpg);">
                <div class="panel-title">
                    <span class="highlight">Featured Card</span>
                    <h4>Reptilian Claw</h4>
                </div>
            </a>
        </div>
        <a href="/news/iggy-and-scorch-release-date-announced" class="featured-panel-main">
            <div class="panel-background anim-slowZoom" style="background-image:url(/assets/example-article-background.jpg);"></div>
            <div class="panel-title">
                <span class="highlight">Featured News</span><span>26 May 2016</span><span>12 comments</span>
                <h1>New Hero Reveal: Riktor</h1>
            </div>
        </a>
    </div>
    <div class="summary-info-wrapper cf">
        <div class="summary-info-discussions">
            <h5>Recent discussion</h5>
            <ul>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                    <span class="details highlight">Question</span><span class="details">0 Responses</span>
                    <span class="content">What is the respawn time for jungle monsters?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/men/27.jpg" class="user-avatar"/>
                    <span class="details highlight">Meta</span><span class="details">0 Responses</span>
                    <span class="content">Is it still worth doing mid, double buff start?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/women/31.jpg" class="user-avatar"/>
                    <span class="details highlight">Question</span><span class="details">0 Responses</span>
                    <span class="content">What is the respawn time for jungle monsters?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/women/11.jpg" class="user-avatar"/>
                    <span class="details highlight">Question</span><span class="details">0 Responses</span>
                    <span class="content">What is the respawn time for jungle monsters?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                    <span class="details highlight">Question</span><span class="details">0 Responses</span>
                    <span class="content">What is the respawn time for jungle monsters?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/men/27.jpg" class="user-avatar"/>
                    <span class="details highlight">Meta</span><span class="details">0 Responses</span>
                    <span class="content">Is it still worth doing mid, double buff start?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/men/76.jpg" class="user-avatar"/>
                    <span class="details highlight">Question</span><span class="details">0 Responses</span>
                    <span class="content">What is the respawn time for jungle monsters?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/women/78.jpg" class="user-avatar"/>
                    <span class="details highlight">Question</span><span class="details">0 Responses</span>
                    <span class="content">What is the respawn time for jungle monsters?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/men/76.jpg" class="user-avatar"/>
                    <span class="details highlight">Question</span><span class="details">0 Responses</span>
                    <span class="content">What is the respawn time for jungle monsters?</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://randomuser.me/api/portraits/women/78.jpg" class="user-avatar"/>
                    <span class="details highlight">Question</span><span class="details">0 Responses</span>
                    <span class="content">What is the respawn time for jungle monsters?</span>
                </a></li>
            </ul>
        </div>
        <div class="summary-info-guides">
            <h5>Featured guides</h5>
            <ul>
                <li><a href="" class="cf">
                    <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/HeroData_ArcBlade/portrait_small.png" class="hero-avatar"/>
                    <span class="details"><i class="fa fa-user" aria-hidden="true"></i> jamieshepherd</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> 120</span>
                    <span class="content">The Ultimate Sparrow Guide - So Good</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/HeroData_Coil/portrait_small.png" class="hero-avatar"/>
                    <span class="details"><i class="fa fa-user" aria-hidden="true"></i> Andhoth</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> 92</span>
                    <span class="content">The Ultimate Sparrow Guide - So Good</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/HeroData_Pyro/portrait_small.png" class="hero-avatar"/>
                    <span class="details"><i class="fa fa-user" aria-hidden="true"></i> Alexmk92</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> 109</span>
                    <span class="content">The Ultimate Sparrow Guide - So Good</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/HeroData_Totem/portrait_small.png" class="hero-avatar"/>
                    <span class="details"><i class="fa fa-user" aria-hidden="true"></i> janellenoir</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> 83</span>
                    <span class="content">The Ultimate Sparrow Guide - So Good</span>
                </a></li>
            </ul>
        </div><div class="summary-info-decks">
            <h5>Top rated decks</h5>
            <ul>
                <li><a href="" class="cf">
                    <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/HeroData_RiftMage/portrait_small.png" class="hero-avatar"/>
                    <span class="details"><i class="fa fa-user" aria-hidden="true"></i> Destiny</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> 120</span>
                    <span class="content">The Ultimate Sparrow Guide - So Good</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/HeroData_Rampage/portrait_small.png" class="hero-avatar"/>
                    <span class="details"><i class="fa fa-user" aria-hidden="true"></i> Lirik</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> 164</span>
                    <span class="content">The Ultimate Sparrow Guide - So Good</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/HeroData_Hammer/portrait_small.png" class="hero-avatar"/>
                    <span class="details"><i class="fa fa-user" aria-hidden="true"></i> HeatoN</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> 127</span>
                    <span class="content">The Ultimate Sparrow Guide - So Good</span>
                </a></li>
                <li><a href="" class="cf">
                    <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/HeroData_Grux/portrait_small.png" class="hero-avatar"/>
                    <span class="details"><i class="fa fa-user" aria-hidden="true"></i> Pott1</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> 109</span>
                    <span class="content">The Ultimate Sparrow Guide - So Good</span>
                </a></li>
            </ul>
        </div>
    </div>

@endsection
