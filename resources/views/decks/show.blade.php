@extends('layouts/app')
@section('body')
    <div id="sidebar">
        <div id="deck-sidebar-list" class="sidebox panel" data-title="{{ $deck->title }}"></div>
        <div id="deck-sidebar-cost-curve" class="sidebox panel"></div>
    </div>

    <div id="deck-detail-wrapper">
        <div id="deck-container"></div>
        @include('layouts.commentFeed')
    </div>
@endsection
@section('scripts')
    <script type="text/javascript">
        var csrf = '{{ csrf_token() }}';
        var DECK = {!! json_encode($deck) !!};
    </script>
@endsection
