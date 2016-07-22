@extends('layouts/app')
@section('title')
{{ $guide->title }} -
@endsection
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
                </a><div class="btn btn-primary btn-half btn-share">
                    <div class="initial">
                        <i class="fa fa-retweet" aria-hidden="true"></i> Share it
                    </div>
                    <div class="social-buttons">
                        <a href="https://www.reddit.com/r/paragon/submit?url={{ urlencode( 'http://para.gg/'.$shortcode->code) }}&title={{ urlencode($guide->title) }}"
                           onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=768,width=1024');return false;"><i class="fa fa-reddit-alien" aria-hidden="true"></i></a>
                        <a href="https://twitter.com/intent/tweet?text={{ urlencode($guide->title) }}%20-%20&url={{ urlencode( 'http://para.gg/'.$shortcode->code) }}"
                           onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode( 'http://para.gg/'.$shortcode->code) }}&t={{ urlencode($guide->title) }}"
                        onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
                    </div>
                </div>
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
        <div class="article-wrapper">
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
         </div>
    </article>
    @include('layouts.commentFeed')
    @if($guide->status == 'draft')
        <div class="draft-mode">
            <span style="margin-right: 30px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> This guide is currently in draft mode and is <strong>NOT</strong> public</span>
            <a class="btn btn-primary" href="/guides/edit/{{ $guide->id }}"><i class="fa fa-pencil" aria-hidden="true"></i> Edit guide</a>
            <a class="btn btn-primary btn-green-hover" href="/guides/publish/{{ $guide->id }}"><i class="fa fa-check" aria-hidden="true"></i> Publish guide</a>
        </div>
    @endif
@endsection
@section('scripts')
    <script type="text/javascript">
        var DECK = {!! json_encode($deck) !!};
        console.log("DECK IS: ", DECK);
    </script>
@endsection
