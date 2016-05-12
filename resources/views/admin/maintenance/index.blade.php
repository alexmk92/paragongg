@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <h3>Maintenance tasks</h3>
        <div class="content-wrapper">
            <a class="btn" href="/admin/maintenance/update-cards"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update cards database</a>
        </div>
    </div>
@endsection