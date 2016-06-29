@extends('layouts/app')
@section('body')
    <div class="featured-wrapper">
        <div class="featured-panel-wrapper">
            @if(isset($featuredHero))
            <a href="/heroes/{{ $featuredHero->slug }}" class="featured-panel" style="background-image:url({{ S3URL() }}/images/heroes/{{ $featuredHero->code }}/{{  $featuredHero->image }}/portrait_large.png);">
                <div class="panel-title">
                    <span class="highlight">Featured Hero</span>
                    <h4>{{ $featuredHero->name }}</h4>
                </div>
            </a>
            @endif
            @if(isset($featuredCard))
            <a href="/cards/{{ $featuredCard->slug }}" class="featured-panel" style="background-image:url({{ S3URL() }}/images/cards/{{ $featuredCard->code }}/{{  $featuredCard->icon }}/icon_large.png);">
                <div class="panel-title">
                    <span class="highlight">Featured Card</span>
                    <h4>{{ $featuredCard->name }}</h4>
                </div>
            </a>
            @endif
        </div>
        @if(isset($featuredNews))
        <a href="/news/{{ $featuredNews->id  }}/{{ $featuredNews->slug  }}" class="featured-panel-main">
            @if($featuredNews->impact)
                <div class="panel-background anim-slowZoom" style="background-image:url({{ S3URL() }}/images/news/impact/{{ $news->impact }});"></div>
            @else
                <div class="panel-background anim-slowZoom" style="background-image:url(/assets/images/featuredNews.jpg);"></div>
            @endif
            <div class="panel-title">
                <span class="highlight">Featured News</span><span>{{ $featuredNews->created_at->diffForHumans() }}</span>
                <h1>{{ $featuredNews->title }}</h1>
            </div>
        </a>
        @endif
    </div>
    <div class="summary-info-wrapper cf">
        <div class="summary-info summary-info-discussions">
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
        <div class="summary-info summary-info-guides">
            <h5>Featured guides</h5>
            <ul>
                @if($featuredGuides->count() > 0)
                @foreach($featuredGuides as $guide)
                    <li><a href="/guides/{{$guide->id}}/{{$guide->slug}}" class="cf">
                        <img src="{{ S3URL() }}/images/heroes/{{ $guide->hero->code }}/{{ $guide->hero->image }}/portrait_small.png" class="hero-avatar"/>
                        <span class="details"><i class="fa fa-user" aria-hidden="true"></i> {{ $guide->author->username }}</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> {{ $guide->votes }}</span>
                        <span class="content">{{ $guide->title }}</span>
                    </a></li>
                @endforeach
                @else
                    <p>There are currently no featured guides.</p>
                @endif
            </ul>
        </div><div class="summary-info summary-info-decks">
            <h5>Top rated decks</h5>
            <ul>
                @if($topDecks->count() > 0)
                    @foreach($topDecks as $deck)
                        <li><a href="/decks/{{  $deck->id }}/{{ $deck->slug }}" class="cf">
                                <img src="{{ S3URL() }}/images/heroes/{{ $deck->hero->code }}/{{ $deck->hero->image }}/portrait_small.png" class="hero-avatar"/>
                                <span class="details"><i class="fa fa-user" aria-hidden="true"></i> {{ $deck->author->username }}</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> {{ $deck->votes }}</span>
                                <span class="content">{{ $deck->title }}</span>
                            </a></li>
                    @endforeach
                @else
                    <p>There are currently no featured guides.</p>
                @endif
            </ul>
        </div>
    </div>

@endsection
