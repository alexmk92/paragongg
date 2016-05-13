@extends('layouts/app')
@section('body')
    <div id="sidebar">
        <h4 class="heading">More news</h4>
        @if(isset($recent) && count($recent))
            @foreach($recent as $article)
                <a class="article-preview" href="/news/{{ $article->slug }}">
                    <div class="preview-details">
                        <div class="date">6 Hours Ago</div>
                        <div class="heading"><h2>{{ $article->title }}</h2></div>
                    </div>
                </a>
            @endforeach
        @else
            <p>Sorry, we couldn't find any more recent news.</p>
        @endif
    </div>
    <article>
        <div class="article-header">
        </div>
        <h1>Iggy and Scorch something announced</h1>
        <div class="article-details">
            <time>Posted by <a href="/users/jamieshepherd">@jamieshepherd</a> on 24th April 2016, 16:25 GMT<span class="updated_at"> (Updated: 24th April 2016, 16:25 GMT)</span></time>
        </div>
        <div class="article-body">
            {!! (new Parsedown())->text($article->body) !!}
        </div>
    </article>
    @include('layouts.commentFeed')
@endsection
