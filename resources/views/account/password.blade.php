@extends('layouts/app')
@section('body')
    @include('account.nav')
    <div class="wrapper">
        <h3>Edit profile</h3>
        <form role="form" method="POST" action="{{ Request::url() }}">
            @if (count($errors) > 0)
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            {!! csrf_field() !!}
            <label>Current password</label>
            <input type="password" name="old_password">
            <hr>
            <label>New password</label>
            <input type="password" name="new_password">
            <label>Confirm new password</label>
            <input type="password" name="new_password_confirmation">
            <button type="submit"><i class="fa fa-check" aria-hidden="true"></i> Save changes</button>
        </form>
    </div>
@endsection
