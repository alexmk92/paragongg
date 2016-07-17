@extends('layouts/app')
@section('body')
    {{--<div id="particle-wrapper" data-theme="embers"></div>--}}
    <div class="impact-box">
        <h3 class="section-heading">Export - Choose a deck slot</h3>
        <div class="alert">
            <p><i class="fa fa-info-circle first-icon" aria-hidden="true"></i> On our website, you don't have to worry about not having the exact amount of cards needed to create a full deck, we'll just make a deck with the ones you own. <strong>Easy.</strong></p>
        </div>
        <div class="epic-deck-list">
            <h5>Empty deck slots</h5>
            @if(sizeof($vacant) < 1)
                <p>You have no empty deck slots. Select one of your decks from below to overwrite it.</p>
            @endif
            @foreach($vacant as $deck)
                <a href="/decks/export/{{ $newDeck->id }}/save/{{ $deck['id'] }}" class="deck-preview vacant" style="background-image: url({{ S3URL() }}/images/heroes/{{ $newDeck->hero['code'] }}/{{ $deck['image'] }}/portrait_medium.png);">
                    <span class="deck-title">EMPTY SLOT</span>
                </a>
            @endforeach
                <br><br><br><br>
        </div>
        <div class="epic-deck-list">
            <h5>Overwrite an existing deck</h5>
            @if(sizeof($occupied) < 1)
                <p>You have no existing deck slots. Select an empty slot from above instead.</p>
            @endif
            @foreach($occupied as $deck)
                <a href="/decks/export/{{ $newDeck->id }}/save/{{ $deck['id'] }}" class="deck-preview occupied" style="background-image: url({{ S3URL() }}/images/heroes/{{ $deck['hero']['id'] }}/{{ $deck['image'] }}/portrait_medium.png);" onclick="return confirm('Are you sure you would like to overwrite this deck slot?');">
                    <span class="deck-title">{{ $deck['name'] }}</span>
                </a>
            @endforeach
        </div>
    </div>
@endsection
