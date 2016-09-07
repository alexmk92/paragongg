@extends('layouts.app')
@section('body')
    <form class="solo" class="form-horizontal" role="form" method="POST" action="{{ url('/password/email') }}">
        {!! csrf_field() !!}
        <h2>Reset password</h2>
        
        <label>E-Mail Address</label>
        <input type="email" class="form-control" name="email" value="{{ old('email') }}">

        <button type="submit" class="btn">
            <i class="fa fa-btn fa-envelope"></i>Send password reset link
        </button>

    </form>
@endsection
