@extends('layouts/app')
@section('body')
    <h2>Decks index</h2>
    <hr/>
    <a class="btn btn-primary" href="/decks/create">Create a deck</a>
    <hr/>
    @foreach($decks as $deck)
        {{ var_dump($deck) }}
    @endforeach
@endsection
