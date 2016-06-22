@extends('layouts/app')
@section('body')
    <div id="sidebar">
    </div>

    <div id="deck-detail-wrapper">
        <div id="deck-info">
            <div id="hero-avatar">
                <img src={{ $deck->hero["avatarURL"] }} alt={{ $deck->hero["name"] }} />
            </div>
            <div id="title-wrapper">
                <h2>{{ $deck->title }}</h2>
                <p>{{ $deck->description }}</p>
            </div>
            <div id="vote-wrapper">
                <i class="fa fa-star"></i> <span>{{ $deck->voteCount }}</span>
            </div>
        </div>


        <div id="deck-container"></div>
        @include('layouts.commentFeed')
    </div>
@endsection
<script>
    var DECK = {!! json_encode($deck) !!};
</script>