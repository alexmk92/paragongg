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
                        <td><a href="/decks/{{ $deck->id }}/{{ $deck->slug }}">{{ $deck->title }}</a></td>
                        <td>{{ $deck->hero['name'] }}</td>
                        <td>
                            <a href="/decks/edit/{{ $deck->id }}" class="btn btn-faded">Edit</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
