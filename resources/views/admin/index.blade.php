@extends('layouts/app')
@section('body')
    @include('admin.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/admin">Admin</a></span>
        <h1>Dashboard</h1>
        <hr/>
        <div class="content-wrapper">
            <h4>Total Users:</h4>
            <p>{{ $stats->users }}</p>
            <h4>Total Players Tracked:</h4>
            <p>{{ $stats->players }}</p>
            <h4>Linked Accounts:</h4>
            <p>{{ $stats->linkedUsers }}</p>
            <h4>Total Matches:</h4>
            <p>{{ $stats->matches }}</p>
            <h4>Total Guides:</h4>
            <p>{{ $stats->guides }}</p>
            <h4>Total Decks:</h4>
            <p>{{ $stats->decks }}</p>
        </div>
    </div>
@endsection
@section('scripts')

@endsection
