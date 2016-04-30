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
            <label>Username</label>
            <input type="text" name="username" value="{{ $user->username }}" disabled>
            <label>Full name</label>
            <input type="text" name="name" value="{{ $user->name }}">
            <label>Email</label>
            <input type="email" name="email" value="{{ $user->email }}">
            <label><i class="fa fa-globe" aria-hidden="true"></i> Personal website</label>
            <input type="text" name="website" value="{{ $user->website or '' }}">
            <label><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</label>
            <input type="text" name="twitter" value="{{ $user->twitter or '' }}">
            <label><i class="fa fa-twitch" aria-hidden="true"></i> Twitch TV account</label>
            <input type="text" name="twitch_tv" value="{{ $user->twitch_tv or '' }}">
            <label>Personal bio</label>
            <textarea name="bio" placeholder="The personal bio that will be shown on your user profile">{{ $user->bio or '' }}</textarea>
            <button type="submit"><i class="fa fa-check" aria-hidden="true"></i> Save changes</button>
        </form>
    </div>
@endsection
