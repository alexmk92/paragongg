@extends('layouts/app')
@section('body')
    <div id="card-detail-container"></div>

    @include('layouts.commentFeed')
@endsection
@section('scripts')
    <script>
        var CARD = {!! json_encode($card) !!};
    </script>
@endsection
