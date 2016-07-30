@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/admin">Admin</a> / <a href="/admin/heroes">Heroes</a></span>
        <h1>Heroes</h1>
        <hr>
        <a class="btn" href="/admin/maintenance/update-heroes"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update heroes database</a>
        <hr>
        <div class="table-scroller">
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
            @foreach($heroes as $hero)
                <tr>
                    <td>{{ $hero->id }}</td>
                    <td><a href="/heroes/{{ $hero->slug }}">{{ $hero->name }}</a></td>
                    <td><a href="/heroes/{{ $hero->slug }}">{{ $hero->code }}</a></td>
                    <td><a class="btn btn-faded" href="/heroes/edit/{{ $hero->code }}"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a> <a class="btn btn-faded btn-warning-hover" href="/heroes/delete/{{ $hero->code }}" onclick="return confirm('Are you sure you would like to delete this?');"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        </div>
        <hr/>
        <div class="pagination-wrapper center cf">{!! $heroes->render() !!}</div>
    </div>
@endsection
