@extends('layouts/app')
@section('title')
    Paragon Decks -
@endsection
@section('meta_tags')
    <meta name="description" content="A complete listing of all decks and stats for Paragon, the MOBA from Epic Games.">
@endsection
@section('scripts')
    <script type="text/javascript">
        var csrf   = '{{ csrf_token() }}';
        var AUTHED = '{{ Auth::check() }}';
        var DECKS  = {!! json_encode($decks) !!};
        var HEROES = {!! json_encode($heroes) !!};
        var HERO   = {!! json_encode($hero) !!}

        console.log(DECKS);
    </script>
@endsection
@section('body')
    <div id="sidebar">
        <div class="sidebox panel create-deck">
            <h4>Create a deck</h4>
            <p>Creating a deck for Paragon.gg is <strong>quick</strong> and <strong>easy</strong>, and will allow you to show the community the cards you use in Paragon.</p>
            <a class="btn btn-primary btn-margin" href="/decks/create">Build a deck</a>
        </div>
        <div class="listbox panel">
            <h4>Featured decks</h4>
            <ul>
            @if(count($decks['featured']) == 0)
                <p>There are no featured decks.</p>
            @else
                @foreach($decks['featured'] as $deck)
                    <li><a href="decks/{{ $deck->_id }}/{{ $deck->slug }}" class="cf">
                            <img src="{{ S3URL()}}/images/heroes/{{ $deck->hero['code'] }}/{{ $deck->hero['image'] }}/portrait_small.png" class="user-avatar"/>
                            <span class="details highlight">{{ $deck->hero['name'] }} deck</span>
                            <span class="details"><i class="fa fa-star" aria-hidden="true"></i> {{ $deck->votes }}</span>
                            <span class="details"><i class="fa fa-eye" aria-hidden="true"></i> {{ $deck->views }}</span>
                            <span class="content">{{ $deck->title }}</span>
                        </a></li>
                @endforeach
            @endif
            </ul>
        </div>
    </div>
    <div class="wrapper">
        <h2>Paragon decks</h2>
        <div id="decks-feed"></div>
    </div>
@endsection
