@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/cards">Cards</a></span>
        <h1>Cards</h1>
        <hr>
        <table class="minimal">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($cards as $card)
                    <tr>
                        <td>{{ $card->id }}</td>
                        <td>{{ $card->code }}</td>
                        <td>{{ $card->name }}</td>
                        <td><a class="btn btn-faded" href="/moderation/cards/feature/{{ $card->id }}">Feature</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection