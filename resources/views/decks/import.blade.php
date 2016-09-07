@extends('layouts/app')
@section('body')
    {{--<div id="particle-wrapper" data-theme="embers"></div>--}}
    <div class="impact-box">
        <h3 class="section-heading">Import decks from Paragon</h3>
        @if(sizeof($decks) < 1)
            <div class="alert" style="margin-bottom: 30px;">
                <i class="fa fa-exclamation-triangle first-icon" aria-hidden="true" style="font-size: 40px; margin-bottom: 20px;"></i>
                <p>You don't have any custom decks saved to your Paragon account yet, so cannot import anything. When you hit <strong>level 5</strong> in game, make a deck and you can copy it over here. Or, if you're already level 5, why not <strong>export a deck</strong> from our site?</p>
                <a class="btn btn-primary" href="/decks" style="margin-top: 20px;"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> View decks on Paragon.gg</a>
            </div>
        @else
            <div class="epic-deck-list">
                <a href="/decks/import/all" class="btn btn-primary" style="margin-bottom: 20px;"><i class="fa fa-check-circle" aria-hidden="true"></i> Import all of my decks to Paragon.gg</a>
                <label>&mdash; or &mdash;</label>
                <h5 style="margin-top: 20px;">Select a deck to import</h5>

                @foreach($decks as $deck)
                    @if(isset($deck['hero']))
                    <a href="/decks/import/{{ $deck['id'] }}" class="deck-preview occupied" style="background-image: url({{$deck['hero']['images']['icon']}});">
                        <span class="deck-title">{{ $deck['name'] }}</span>
                    </a>
                    @endif
                @endforeach
            </div>
        @endif
    </div>
@endsection
