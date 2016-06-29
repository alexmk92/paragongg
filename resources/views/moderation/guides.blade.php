@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/guides">Guides</a></span>
        <h1>Guides</h1>
        <hr>
        <table class="minimal">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($guides as $guide)
                    <tr>
                        <td>{{ $guide->id }}</td>
                        <td>{{ $guide->title }}</td>
                        <td>{{ $guide->author->username }}</td>
                        <td>{{ $guide->status }}</td>
                        <td><a class="btn btn-faded" href="/moderation/guides/feature/{{ $guide->id }}">Feature</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection