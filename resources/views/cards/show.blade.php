@extends('layouts/app')
@section('title')
    {{ $card->name }} -
@endsection
@section('meta_tags')
<meta property="og:image" content="{{ S3URL() }}/images/cards/{{ $card->code }}/{{ $card->icon }}/icon_small.png" />
    <meta name="thumbnail" content="{{ S3URL() }}/images/cards/{{ $card->code }}/{{ $card->icon }}/icon_small.png" />
    <meta name="description" content="{{ $card->name }}, Type: {{ $card->type }}, Cost: {{ $card->cost }}, Affinity: {{ $card->affinity }}, Rarity: {{ $card->rarity }} - Check out more cards at Paragon.gg.">
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
