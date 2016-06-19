@extends('layouts/app')
@section('body')
    <span class="breadcrumb"><a href="/heroes/{{ $hero->slug }}">{{ $hero->name }}</a> / <a href="/heroes/edit/{{ $hero->code }}">Edit</a></span>
    <h2>Edit a hero</h2>
    <form role="form" method="POST" action="{{ Request::url() }}" enctype="multipart/form-data">
        {!! csrf_field() !!}
        <label>Upload new hero background</label>
        <input name="background" type="file">

        <label>Upload new hero cutout</label>
        <input name="cutout" type="file">
        <button type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Save changes</button>
    </form>
@endsection
