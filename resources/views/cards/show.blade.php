@extends('layouts/app')
@section('title')
    {{ $card->name }} -
@endsection
@section('body')
    <div id="card-detail-container"></div>

    @include('layouts.commentFeed')
@endsection
@section('scripts')
    <script>
        var CARD = {!! json_encode($card) !!};
    </script>
@endsection
