@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/news">News</a></span>
        <h2>News</h2>
        <a class="btn btn-primary btn-margin" href="/news/create">Create post</a>
        <hr>
        <table class="minimal">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($news as $post)
                    <tr>
                        <td>{{ $post->id }}</td>
                        <td>{{ $post->author->username }}</td>
                        <td>{{ $post->title }}</td>
                        <td>{{ $post->status }}</td>
                        <td><a class="btn btn-faded" href="/news/edit/{{ $post->id }}"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a> <a class="btn btn-faded btn-warning-hover" href="/news/delete/{{ $post->id }}" onclick="return confirm('Are you sure you would like to delete this?');"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
