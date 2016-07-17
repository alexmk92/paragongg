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
            @else
                <p>No featured hero.</p>
            @endif
            @if(isset($featuredCard))
            <a href="/cards/{{ $featuredCard->slug }}" class="featured-panel" style="background-image:url({{ S3URL() }}/images/cards/{{ $featuredCard->code }}/{{  $featuredCard->icon }}/icon_large.png);">
                <div class="panel-title">
                    <span class="highlight">Featured Card</span>
                    <h4>{{ $featuredCard->name }}</h4>
                </div>
            </a>
            @else
                <p>No featured card.</p>
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
        @else
            <p>No featured news.</p>
        @endif
    </div>
    <div class="summary-info-wrapper cf">
        <div class="summary-info summary-info-discussions">
            <h5>Welcome to Paragon.gg 2.0</h5>
            <p>Hello there! You might notice things are a little different, and in true Paragon fashion we're launching everything a little early.</p>
            <p>You may notice some of the guides and decks aren't over to the new site just yet, don't worry! We're in the process of moving these all over, and will let everyone know when we're done!</p>
            <p><strong>- The Paragon.gg Team</strong></p>
            {{--<ul>--}}
                {{--<li><a href="" class="cf">--}}
                    {{--<img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>--}}
                    {{--<span class="details highlight">Question</span><span class="details">0 Responses</span>--}}
                    {{--<span class="content">What is the respawn time for jungle monsters?</span>--}}
                {{--</a></li>--}}
            {{--</ul>--}}
        </div>
        <div class="summary-info summary-info-guides">
            <h5>Featured guides</h5>
            <ul>
                @if(isset($featuredGuides) && $featuredGuides->count() > 0)
                @foreach($featuredGuides as $guide)
                    <li><a href="/guides/{{$guide->id}}/{{$guide->slug}}" class="cf">
                        @if($guide->hero)
                            <img src="{{ S3URL() }}/images/heroes/{{ $guide->hero->code }}/{{ $guide->hero->image }}/portrait_small.png" class="hero-avatar"/>
                        @else
                            <img src="/assets/images/heroes/null.png" class="hero-avatar"/>
                        @endif
                        <span class="details"><i class="fa fa-user" aria-hidden="true"></i> {{ $guide->author->username }}</span><span class="details"><i class="fa fa-star" aria-hidden="true"></i> {{ $guide->votes }}</span><span class="details"><i class="fa fa-eye" aria-hidden="true"></i> {{ $guide->views }}</span>
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
                @if(isset($topDecks) && $topDecks->count() > 0)
                    @foreach($topDecks as $deck)
                        <li><a href="/decks/{{  $deck->_id }}/{{ createSlug($deck->title) }}" class="cf">
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
