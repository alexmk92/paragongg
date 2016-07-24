@extends('layouts/app')
@section('body')
    @include('moderation.nav')
    <div class="wrapper">
        <span class="breadcrumb"><a href="/moderation">Moderation</a> / <a href="/moderation/reports">Reports</a></span>
        <h1>Reports</h1>
        <hr>
        <div class="table-scroller">
        <table class="minimal">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Reference</th>
                    <th>Reported by</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach($reports as $report)
                    <tr>
                        <td>{{ $report->id }}</td>
                        <td>{{ $report->ref_id }}</td>
                        <td>{{ $report->author->username }}</td>
                        <td>-</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        </div>
    </div>
@endsection
