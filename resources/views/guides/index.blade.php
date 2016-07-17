@extends('layouts/app')
@section('scripts')
    <script type="text/javascript">
        var GUIDES = {!! json_encode($guides) !!};
        var HEROES = {!! json_encode($heroes) !!};
        var HERO   = {!! json_encode($hero) !!};
    </script>
@endsection
@section('body')
    <div id="sidebar">
        <div class="sidebox panel">
            <h4>Gameplay guides</h4>
            @if(!empty($gameplay))
                <ul>
                @foreach($gameplay as $gameplayGuide)
                     <li>{{ $gameplayGuide->title }}</li>
                @endforeach
                </ul>
            @else
                <p>There are currently no popular gameplay guides.</p>
                <a class="btn btn-primary btn-margin" href="/guides/gameplay">View all gameplay guides</a>
            @endif
        </div>
        @if(!empty($featured))
            <div class="sidebox panel">
                <h4 class="heading">Featured guides</h4>
                @foreach($featured as $guides)
                    <a class="article-preview" href="/news/{{ $article->slug }}">
                        <div class="preview-details">
                            <div class="date">6 Hours Ago</div>
                            <div class="heading"><h2>{{ $article->title }}</h2></div>
                        </div>
                    </a>
                @endforeach
            </div>
        @endif
        <div class="sidebox panel">
            <h4>Create a guide</h4>
            <p>Creating a guide for Paragon.gg is quick and easy, and will help the community learn gameplay mechanics or heroes with your help.</p>
            <p>If you don't want to write a full guide, you can also just build and share a card deck for your favourite hero. Head on over to the <a href="">decks</a> section to do that.</p>
            <a class="btn btn-primary btn-margin" href="/guides/create">Write a guide</a>
            <a class="btn btn-primary btn-margin" href="/guides/create">Build a deck</a>
        </div>
    </div>
    <div class="wrapper">
        <div class="switcher">
            <span><a href="/guides">Hero Guides</a> / <a href="/guides/gameplay" class="faded">Gameplay Guides</a></span>
        </div>
        <h2>Paragon guides</h2>
        <div id="guides-feed"></div>
    </div>
@endsection
