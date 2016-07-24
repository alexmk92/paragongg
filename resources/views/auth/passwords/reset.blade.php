@extends('layouts.app')

@section('body')
    <form class="solo" class="form-horizontal" role="form" method="POST" action="{{ url('/password/reset') }}">
        {!! csrf_field() !!}
        <input type="hidden" name="token" value="{{ $token }}">
        <h2>Reset password</h2>

        <label>E-Mail Address</label>
        <input type="email" class="form-control" name="email" value="{{ $email or old('email') }}">

        <label>New Password</label>
        <input type="password" class="form-control" name="password">

        <label>Confirm new password</label>
        <input type="password" class="form-control" name="password_confirmation">

        <button type="submit" class="btn">
            <i class="fa fa-btn fa-sign-in"></i>Reset password
        </button>

    </form>
@endsection
