@extends('layouts/app')
@section('body')
    <div id="sidebar" class="sidebar-with-widgets">
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
