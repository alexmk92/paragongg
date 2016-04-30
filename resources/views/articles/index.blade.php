@extends('layouts/app')
@section('body')

    <div id="news-feed">
        @foreach($articles as $article)<a class="article-preview" href="/news/{{ $article->slug }}">
            <div class="preview-details">
                <div class="date">{{ $article->created_at->diffForHumans() }}</div>
                <div class="heading"><h2>{{ $article->title }}</h2></div>
            </div></a>@endforeach
    </div>
@endsection
