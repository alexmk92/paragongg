@extends('layouts/app')
@section('body')
    <div id="sidebar">
    </div>

    <div id="deck-detail-wrapper">
        <div id="deck-container"></div>
    </div>
    @include('layouts.commentFeed')
@endsection
<script>
    var DECK = {!! json_encode($deck) !!};
</script>