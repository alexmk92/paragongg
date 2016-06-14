@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/admin">Admin</a> / <a href="/admin/cards">Cards</a></span>
        <h1>Cards</h1>
        <hr>
        <a class="btn" href="/admin/maintenance/update-cards"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update cards database</a>
        <a class="btn" href="/admin/maintenance/update-cards?update_images=true"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update card images</a>
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
                    <td><a class="btn btn-faded" href="/cards/edit/{{ $card->code }}"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a> <a class="btn btn-faded btn-warning-hover" href="/cards/delete/{{ $card->code }}" onclick="return confirm('Are you sure you would like to delete this?');"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
