@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/news">News</a></span>
        <h1>News</h1>
        <a class="btn btn-primary btn-margin" href="/news/create">Create post</a>
        <hr/>
        <div class="table-scroller">
        <table class="minimal">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($news as $post)
                    <tr>
                        <td>{{ $post->id }}</td>
                        <td><a href="/users/{{ $post->author->username }}">{{ $post->author->username }}</a></td>
                        <td><a href="/news/{{$post->id}}/{{ $post->slug }}">{{ $post->title }}</a></td>
                        <td>
                            @if(!$post->featured)
                                <a class="btn btn-faded" href="/moderation/news/feature/{{ $post->id }}">Feature</a>
                            @else
                                <a class="btn btn-faded" href="/moderation/news/unfeature/{{ $post->id }}">Unfeature</a>
                            @endif
                            <a class="btn btn-faded" href="/moderation/news/frontpage/{{ $post->id }}">Frontpage</a>
                            <a class="btn btn-faded" href="/news/edit/{{ $post->id }}"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                            <a class="btn btn-faded btn-warning-hover" href="/news/delete/{{ $post->id }}" onclick="return confirm('Are you sure you would like to delete this?');"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        </div>
        <hr/>
        <div class="pagination-wrapper center cf">{!! $news->render() !!}</div>
    </div>
@endsection
