@extends('layouts/app')
@section('body')
    <div class="article-header">
        <img src="{{ S3URL() }}/images/news/headers/{{ $article->header }}"/>
        <div id="sidebar" class="article-sidebar panel">
            <div class="sidebox panel toc">
                <h4>Table of Contents</h4>
                {!! $articleTOC !!}
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
        </div>
    </article>
    @include('layouts.commentFeed')
@endsection
