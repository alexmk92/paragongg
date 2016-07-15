@extends('layouts/app')
@section('body')
    @include('account.nav')
    <div class="wrapper">
        <h3>Your guides</h3>
        <div class="content-wrapper">
            <table class="minimal">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                @foreach($guides as $guide)
                    <tr>
                        <td>{{ $guide->title }}</td>
                        <td>{{ $guide->type }}</td>
                        <td></td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
