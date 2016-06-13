@extends('layouts/app')
@section('body')
    <h2>Edit a hero</h2>
    <form role="form" method="POST" action="{{ Request::url() }}">
        {!! csrf_field() !!}
        <label>Hero object</label>
        <textarea class="tall" name="data">{{ json_encode($hero, JSON_PRETTY_PRINT) }}</textarea>
        <button type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Save changes</button>
    </form>
@endsection
