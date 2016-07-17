@extends('layouts/app')
@section('body')
    <div class="article-header">
        @if($guide->type == 'hero')
            <img src="/assets/images/heroes/{{ $hero->slug }}/banner.jpg"/>
        @else
            <img src="/assets/images/gameplay-banner.jpg"/>
        @endif
        <div id="sidebar" class="article-sidebar panel">
            <div class="sidebox panel toc">
                <h4>Table of Contents</h4>
                {!! $guideTOC !!}
            </div>
            <div class="sidebox panel rating">
                <label>Was this guide helpful?</label>
                <a href="/vote?type=guide&ref_id={{ $guide->id }}" class="btn btn-primary btn-half">
                    <i class="fa fa-star"/></i> {{ $guide->votes }} votes
                </a><a href="" class="btn btn-primary btn-half">
                    <i class="fa fa-retweet" aria-hidden="true"></i> Share it
                </a>
                @if($shortcode)
                    <label style="margin-top: 30px;">Or use this shareable link</label>
                    <input type="text" onfocus="this.select();" onmouseup="return false;" readonly="readonly" class="copypasta" value="http://para.gg/{{ $shortcode->code }}"/>
                @endif
            </div>
            @if($deck)
            <div id="deck-sidebar-list" class="sidebox panel" data-title="{{ $deck->title }}"></div>
            @endif
        </div>
    </div>
    <article>
        <h1 class="article-title">{{ $guide->title }}</h1>
        <div class="article-details">
            <time>Posted by <strong><img class="user-avatar inline small" src="{{getAvatar($guide->author)}}">{{ $guide->author->username }}</strong> on {{ $guide->created_at->format('jS F Y, h:i A') }}<span class="updated_at"> (Updated: {{ $guide->created_at->format('jS F Y, h:i A') }})</span></time>
        </div>
        @if($guide->abilities && $guide->abilities != ',,,,,,,,,,,,,,')
            @include('guides.abilityTable')
        @endif
        @if($deck && $deck->builds)
            <h2 class="no-line">Deck builds</h2>
            <div id="deck-builds"></div>
        @endif
        <div class="article-body">
            {!! $guideBody !!}
        </div>
    </article>
    @include('layouts.commentFeed')
@endsection
@section('scripts')
    <script type="text/javascript">
        var DECK = {!! json_encode($deck) !!};
    </script>
@endsection
