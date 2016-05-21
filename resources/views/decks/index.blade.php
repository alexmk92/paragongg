@extends('layouts/app')
@section('body')
    <h2>Decks index</h2>
    @foreach($decks as $deck)
        {{ var_dump($deck) }}
    @endforeach
@endsection
