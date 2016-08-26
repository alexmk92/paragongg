@extends('layouts/app')
@section('body')
    {{--<div id="particle-wrapper" data-theme="embers"></div>--}}
    <div class="impact-box">
        <h3 class="section-heading">Import decks from Paragon</h3>
        <div class="epic-deck-list">
            <a href="/decks/import/all" class="btn btn-primary" style="margin-bottom: 20px;"><i class="fa fa-check-circle" aria-hidden="true"></i> Import all of my decks to Paragon.gg</a>
            <label>&mdash; or &mdash;</label>
            <h5 style="margin-top: 20px;">Select a deck to import</h5>
            @if(sizeof($decks) < 1)
                <p>You have no custom decks saved in Paragon yet.</p>
            @endif
            @foreach($decks as $deck)
                @if(isset($deck['hero']))
                <a href="/decks/import/{{ $deck['id'] }}" class="deck-preview occupied" style="background-image: url({{$deck['hero']['images']['icon']}});">
                    <span class="deck-title">{{ $deck['name'] }}</span>
                </a>
                @endif
            @endforeach
        </div>
    </div>
@endsection
