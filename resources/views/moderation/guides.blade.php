@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/guides">Guides</a></span>
        <h1>Guides</h1>
        <hr>
        <div class="table-scroller">
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
                        <td><a href="/guides/{{ $guide->id }}/{{ $guide->slug }}">{{ $guide->title }}</a></td>
                        <td>{{ $guide->author->username }}</td>
                        <td>{{ $guide->status }}</td>
                        @if(!$guide->featured)
                            <td><a class="btn btn-faded" href="/moderation/guides/feature/{{ $guide->id }}">Feature</a></td>
                        @else
                            <td><a class="btn btn-faded" href="/moderation/guides/unfeature/{{ $guide->id }}">Unfeature</a></td>
                        @endif
                    </tr>
                @endforeach
            </tbody>
        </table>
        </div>
        <hr/>
        <div class="pagination-wrapper center cf">{!! $guides->render() !!}</div>
    </div>
@endsection
