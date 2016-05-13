@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <h3>Maintenance tasks</h3>
        <div class="content-wrapper">

            <h4>Cards</h4><br/>
            <a class="btn" href="/admin/maintenance/update-cards"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update cards database</a>
            <br><br>
            <a class="btn" href="/admin/maintenance/update-cards?update_images=true"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update cards database (WITH images)</a>
            <hr>
            <h4>Heroes</h4><br/>
            <a class="btn" href="/admin/maintenance/update-heroes"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update heroes database</a>
            <br><br>
            <a class="btn" href="/admin/maintenance/update-heroes?update_images=true"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Update heroes database (WITH images)</a>

        </div>
    </div>
@endsection
