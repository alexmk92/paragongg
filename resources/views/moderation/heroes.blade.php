@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/heroes">Heroes</a></span>
        <h1>Cards</h1>
        <hr>
        <div class="table-scroller">
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
                @foreach($heroes as $hero)
                    <tr>
                        <td>{{ $hero->id }}</td>
                        <td>{{ $hero->code }}</td>
                        <td>{{ $hero->name }}</td>
                        <td><a class="btn btn-faded" href="/moderation/heroes/feature/{{ $hero->id }}">Feature</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        </div>
    </div>
@endsection
