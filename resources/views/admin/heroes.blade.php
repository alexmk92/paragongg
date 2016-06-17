@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/admin">Admin</a> / <a href="/admin/heroes">Heroes</a></span>
        <h1>Heroes</h1>
        <hr>
        <a class="btn" href="/admin/maintenance/update-heroes"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update heroes database</a>
        <hr>
        <table class="minimal">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach($cards as $card)
                <tr>
                    <td>{{ $card->id }}</td>
                    <td><a href="/cards/{{ $card->name }}">{{ $card->name }}</a></td>
                    <td><a href="/cards/{{ $card->name }}">{{ $card->code }}</a></td>
                    <td><a class="btn btn-faded" href="/heroes/edit/{{ $card->code }}"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a> <a class="btn btn-faded btn-warning-hover" href="/heroes/delete/{{ $card->code }}" onclick="return confirm('Are you sure you would like to delete this?');"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
