@extends('layouts/app')
@section('body')
    @include('account.nav')
    <div class="wrapper">
        <h3>Your decks</h3>
        <div class="content-wrapper">
            <table class="minimal">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Hero</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                @foreach($decks as $deck)
                    <tr>
                        <td>{{ $deck->title }}</td>
                        <td>{{ $deck->hero->name }}</td>
                        <td><a class="btn btn-faded" href="/moderation/heroes/feature/{{ $hero->id }}">Feature</a></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
