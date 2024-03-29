@extends('layouts.app')

@section('body')
    <form class="solo" role="form" method="POST" action="/register" autocomplete="off">
        {!! csrf_field() !!}

        <h2>New account</h2>

        {{--<div class="alert alert-warning">Unfortunately registration is currently disabled while we migrate our old users across to the new site. Please bear with us! We're sorry for the inconvenience.</div>--}}

        <label>Username</label>
        <input type="text" name="username" value="{{ old('username') }}">

        <label>E-Mail Address</label>
        <input type="email" name="email" value="{{ old('email') }}">

        <label>Password</label>
        <input type="password" class="form-control" name="password">

        <label>Confirm Password</label>
        <input type="password" class="form-control" name="password_confirmation">

        <button type="submit" class="btn">
            <i class="fa fa-btn fa-user"></i>Register
        </button>
    </form>
@endsection
