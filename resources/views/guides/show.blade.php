@extends('layouts/app')
@section('body')
    <div id="sidebar">
        <h4 class="heading">Table of contents</h4>
        <ul>
            <li>Introduction</li>
            <li>Cards</li>
            <li>Abilities</li>
            <li>Early Game</li>
            <li>Mid Game</li>
            <li>Late Game</li>
            <li>Conclusion</li>
        </ul>
    </div>
    <article>
        <div class="article-header">
        </div>
        <h1>Iggy and Scorch something announced</h1>
        <div class="article-details">
            <time>Posted by <a href="/users/jamieshepherd">@jamieshepherd</a> on 24th April 2016, 16:25 GMT<span class="updated_at"> (Updated: 24th April 2016, 16:25 GMT)</span></time>
        </div>
        <div class="article-body">
            {!! (new Parsedown())->text($guide->body) !!}
        </div>
    </article>
@endsection
