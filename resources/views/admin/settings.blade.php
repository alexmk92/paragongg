@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <h3>Global settings</h3>
        <div class="content-wrapper">
            <form role="form" method="POST" action="{{ Request::url() }}" enctype="multipart/form-data">
                {!! csrf_field() !!}
                <label>Site-wide notification</label>
                <textarea name="global_notification" placeholder="Set a message that will be displayed at the top of every page">{{ $settings['globalNotification']->value or ''}}</textarea>
                <button type="submit" class="btn btn-primary"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Save all changes</button>
            </form>
        </div>
    </div>
@endsection
@section('scripts')

@endsection