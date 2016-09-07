@extends('layouts/app')
@section('title')
    Paragon Gameplay Guides -
@endsection
@section('scripts')
    <script type="text/javascript">
        var TYPE = "GAMEPLAY";
        var GUIDES = {!! json_encode($guides) !!};
    </script>
@endsection
@section('body')
    <div id="sidebar">
        <div class="sidebox panel">
            <h4>Create a guide</h4>
            <p>Creating a guide for Paragon.gg is quick and easy, and will help the community learn gameplay mechanics or heroes with your help.</p>
            <p>If you don't want to write a full guide, you can also just build and share a card deck for your favourite hero. Head on over to the <a href="">decks</a> section to do that.</p>
            <a class="btn btn-primary btn-margin" href="/guides/create">Write a guide</a>
            <a class="btn btn-primary btn-margin" href="/guides/create">Build a deck</a>
        </div>
        <div class="listbox panel">
            <h4>Featured guides</h4>
            <ul>
                @if(count($guides['featured']) == 0)
                    <p>There are no featured guides.</p>
                @else
                    @foreach($guides['featured'] as $guide)
                        <li><a href="guides/{{ $guide->id }}/{{ $guide->slug }}" class="cf">
                                <img src="{{ S3URL()}}/images/heroes/{{ $guide->hero_code }}/{{ $heroes->where('code', $guide->hero_code)->first()['image'] }}/portrait_small.png" class="user-avatar"/>
                                <span class="details highlight">{{ $guide->hero['name'] }} deck</span>
                                <span class="details"><i class="fa fa-star" aria-hidden="true"></i> {{ $guide->votes }}</span>
                                <span class="details"><i class="fa fa-eye" aria-hidden="true"></i> {{ $guide->views }}</span>
                                <span class="content">{{ $guide->title }}</span>
                            </a></li>
                    @endforeach
                @endif
            </ul>
        </div>
    </div>
    <div class="wrapper">
        <div class="switcher">
            <span><a href="/guides" class="faded">Hero Guides</a> / <a href="/guides/gameplay">Gameplay Guides</a></span>
        </div>
        <h2>Paragon gameplay guides</h2>
        <div id="guides-feed"></div>
    </div>
@endsection
