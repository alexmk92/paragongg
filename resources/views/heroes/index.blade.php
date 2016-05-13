@extends('layouts/app')
@section('body')
    <h2>Heroes</h2>
    @foreach($heroes as $hero)
        <img src="https://s3-eu-west-1.amazonaws.com/paragon.gg/images/heroes/{{ $hero->code }}/portrait.png"/>
    @endforeach
@endsection
