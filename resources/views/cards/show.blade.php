@extends('layouts/app')
@section('body')
    <div id="card-detail-container"></div>
    <div class="centered-comment-feed">
        @include('layouts.commentFeed')
    </div>
@endsection
@section('scripts')
    <script>
        var CARD = {!! json_encode($card) !!};
    </script>
@endsection
