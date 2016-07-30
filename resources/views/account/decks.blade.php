@extends('layouts/app')
@section('body')
    @include('account.nav')
    <div class="wrapper">
        <h3>Your decks</h3>
        <div class="content-wrapper table">
            <div class="table-scroller">
            <table class="minimal full">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Hero</th>
                    <th>Views</th>
                    <th>Votes</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                @foreach($decks as $deck)
                    <tr>
                        <td><a href="/decks/{{ $deck->id }}/{{ $deck->slug }}">{{ $deck->title }}</a></td>
                        <td>{{ $deck->hero['name'] }}</td>
                        <td>{{ $deck->views }}</td>
                        <td>{{ $deck->votes }}</td>
                        <td>
                            <a href="/decks/{{ $deck->id }}/{{ $deck->slug }}" class="btn btn-faded">View</a>
                            <a href="/decks/edit/{{ $deck->id }}" class="btn btn-faded">Edit</a>
                            <a href="/decks/export/{{ $deck->id }}" class="btn btn-faded">Export</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            </div>
            <hr/>
            <div class="pagination-wrapper center cf">{!! $decks->render() !!}</div>
        </div>
    </div>
@endsection
