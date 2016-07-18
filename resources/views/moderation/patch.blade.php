@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/patch">Patch</a></span>
        <h1>Patch</h1>
        <hr>
        <p>Patch currently set to: <strong>{{ $patch->value }}</strong></p>
        <form action="" method="POST">
            {!! csrf_field() !!}
            <label>Set current patch</label>
            <input type="text" name="patch" placeholder="e.g. v.28" value="{{ $patch->value }}">
            <button type="submit">Save patch name</button>
        </form>
    </div>
@endsection
