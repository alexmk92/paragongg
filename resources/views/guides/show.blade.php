@extends('layouts/app')
@section('body')
    <div class="article-header">
        <img src="/assets/images/heroes/dekker/banner.jpg"/>
        <div id="sidebar" class="article-sidebar panel">
            <div class="sidebox panel toc">
                <h4>Table of Contents</h4>
                {!! $guideTOC !!}
            </div>
            @if($deck)
            <div id="deck-sidebar-list" class="sidebox panel" data-title="{{ $deck->title }}"></div>
            @endif
        </div>
    </div>
    <article>
        <h1 class="article-title">Iggy and Scorch something announced</h1>
        <div class="article-details">
            <time>Posted by <a href="/users/jamieshepherd">@jamieshepherd</a> on 24th April 2016, 16:25 GMT<span class="updated_at"> (Updated: 24th April 2016, 16:25 GMT)</span></time>
        </div>
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
