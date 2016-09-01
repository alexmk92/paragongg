@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/admin">Admin</a> / <a href="/admin/users">Users</a></span>
        <h1>Users</h1>
        <hr>
        <div class="table-scroller">
        <table class="minimal">
            <thead>
            <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->id }}</td>
                    <td>{{ $user->username }}</td>
                    <td>{{ $user->role }}</td>
                    <td>
                    @if($user->role != 'administrator')
                    <a class="btn btn-faded" href="/admin/users/impersonate/{{ $user->id }}"><i class="fa fa-user-secret" aria-hidden="true"></i> Impersonate</a>
                     @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        </div>
        <hr/>
        <div class="pagination-wrapper center cf">{!! $users->render() !!}</div>
    </div>
@endsection
