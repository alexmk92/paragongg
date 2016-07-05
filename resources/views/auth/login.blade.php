@extends('layouts.app')

@section('body')
    <form class="solo" role="form" method="POST" action="/login" autocomplete="off">
        {!! csrf_field() !!}
        <h2>Sign in</h2>

        <label>E-Mail Address</label>
        <input type="email" class="form-control" name="email" value="{{ old('email') }}">

        <label>Password</label>
        <input type="password" class="form-control" name="password">

        <label>
            <input type="checkbox" name="remember"> Remember Me
        </label>

        <button type="submit" class="btn">
            <i class="fa fa-btn fa-sign-in"></i>Login
        </button>

        <a class="btn btn-faded" href="{{ url('/password/reset') }}">Forgot Your Password?</a>

    </form>
@endsection
