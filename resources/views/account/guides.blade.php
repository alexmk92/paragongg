@extends('layouts/app')
@section('body')
    @include('account.nav')
    <div class="wrapper">
        <h3>Your guides</h3>
        <div class="content-wrapper">
            <div class="table-scroller">
            <table class="minimal">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                @foreach($guides as $guide)
                    <tr>
                        <td><a href="/guides/{{ $guide->id }}/{{ $guide->slug }}">{{ $guide->title }}</a></td>
                        <td>{{ $guide->type }} guide</td>
                        <td>{{ $guide->status }}</td>
                        <td>
                            @if($guide->status != 'published')
                                <a href="/guides/publish/{{ $guide->id }}" class="btn btn-faded">Publish</a>
                            @else
                                <a href="/guides/unpublish/{{ $guide->id }}" class="btn btn-faded">Unpublish</a>
                            @endif
                            <a href="/guides/edit/{{ $guide->id }}" class="btn btn-faded">Edit</a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            </div>
        </div>
    </div>
@endsection
