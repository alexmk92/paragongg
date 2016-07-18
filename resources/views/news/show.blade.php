@extends('layouts/app')
@section('title')
    {{ $article->title }} -
@endsection
@section('body')
    <div class="article-header">
        <img src="{{ S3URL() }}/images/news/headers/{{ $article->header }}"/>
        <div id="sidebar" class="article-sidebar panel">
            <div class="sidebox panel toc">
                <h4>Table of Contents</h4>
                {!! $articleTOC !!}
            </div>
            <div class="sidebox panel rating">

                <label>Share this post</label>
                <div class="social-buttons-solo">
                    <a href="https://www.reddit.com/r/paragon/submit?url={{ urlencode( 'http://para.gg/'.$shortcode->code) }}&title={{ urlencode($article->title) }}"
                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=768,width=1024');return false;"><i class="fa fa-reddit-alien" aria-hidden="true"></i></a>
                    <a href="https://twitter.com/intent/tweet?text={{ urlencode($article->title) }}%20-%20&url={{ urlencode( 'http://para.gg/'.$shortcode->code) }}"
                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode( 'http://para.gg/'.$shortcode->code) }}&t={{ urlencode($article->title) }}"
                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
                </div>
                @if($shortcode)
                    <label style="margin-top: 30px;">Or use this shareable link</label>
                    <input type="text" onfocus="this.select();" onmouseup="return false;" readonly="readonly" class="copypasta" value="http://para.gg/{{ $shortcode->code }}"/>
                @endif

            </div>
        </div>
    </div>
    <article>
        <div class="article-body">
            <h1 class="article-title">{{ $article->title }}</h1>
            <div class="article-details">
                <time>Posted by <strong><img class="user-avatar inline small" src="{{getAvatar($article->author)}}">{{ $article->author->username }}</strong> on {{ $article->created_at->format('jS F Y, h:i A') }}<span class="updated_at"> (Updated: {{ $article->created_at->format('jS F Y, h:i A') }})</span></time>
            </div>
            <div class="article-body">
                {!! $articleBody !!}
            </div>
            @if($article->source)
                <h2>Source</h2>
                <a href="{{ $article->source }}">{{ $article->source }}</a>
            @endif
        </div>
    </article>
    @include('layouts.commentFeed')
@endsection
