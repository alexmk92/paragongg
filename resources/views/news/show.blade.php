@extends('layouts/app')
@section('body')
    <div class="article-header">
        <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/news/headers/{{ $news->header }}"/>
        <div class="title-wrapper">
            <h1>{{ $news->title }}</h1>
        </div>
    </div>
    <div id="sidebar" class="article-sidebar">
        <div class="sidebox toc">
            <h4>Table of Contents</h4>
            {!! $articleTOC !!}
        </div>
    </div>
    <div id="article-wrapper">
        <time class="post-details">Posted by <a href="/users/jamieshepherd">jamieshepherd</a> on <span class="emphasis">24th April 2016, 16:25 GMT</span><span class="updated_at"> (Updated: 24th April 2016, 16:25 GMT)</span></time>

        <article>
            <div class="article-body">
                {!! $articleBody !!}
            </div>
        </article>
    </div>
    @include('layouts.commentFeed')
@endsection
