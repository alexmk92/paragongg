@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/decks">Decks</a></span>
        <h1>Decks</h1>
        <hr>
        <div class="table-scroller">
        <table class="minimal">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($decks as $deck)
                    <tr>
                        <td>{{ $deck->id }}</td>
                        <td><a href="/decks/{{ $deck->id }}/{{ $deck->slug }}">{{ $deck->title }}</a></td>
                        @if(!$deck->featured)
                            <td><a class="btn btn-faded" href="/moderation/decks/feature/{{ $deck->id }}">Feature</a></td>
                        @else
                            <td><a class="btn btn-faded" href="/moderation/decks/unfeature/{{ $deck->id }}">Unfeature</a></td>
                        @endif
                    </tr>
                @endforeach
            </tbody>
        </table>
        </div>
    </div>
@endsection
