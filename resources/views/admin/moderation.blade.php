@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/admin">Admin</a> / <a href="/admin/moderation">Moderation</a></span>
        <h1>Moderation team</h1>
        <hr>
        <form role="form" method="POST" action="/admin/moderation/mod" enctype="multipart/form-data">
            {!! csrf_field() !!}
            <label>Enter username</label>
            <input type="text" name="username">
            <button type="submit">Assign moderator status</button>
        </form>
        <hr>
        <div class="table-scroller">
            <table class="minimal">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                @foreach($users as $user)
                    <tr>
                        <td>{{ $user->id }}</td>
                        <td><a href="/users/{{ $user->username }}">{{ $user->username }}</a></td>
                        <td><a class="btn btn-warning-hover" href="/admin/moderation/demod/{{ $user->id }}"><i class="fa fa-times" aria-hidden="true"></i> Demod</a></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
