@extends('layouts/app')
@section('body')
    <div id="sidebar">
        @if (auth()->check() && $deck->author_id == auth()->user()->id)
            <div id="deck-sidebar-edit" class="sidebox panel" data-title="Edit your deck">
                <h3>Edit Deck</h3>
                <p style="padding:10px 0 20px 0;">We realise that you own this deck, if you'd like to make any changes click the edit button below!</p>
                <a href={{ "/decks/edit/".$deck->id }} class="btn btn-primary btn-full" title="Edit this deck"><i class="fa fa-pencil" aria-hidden="true"></i>Edit deck</a>
            </div>
        @endif
        <div id="deck-sidebar-list" class="sidebox panel" data-title="{{ $deck->title }}"></div>
        <div id="deck-sidebar-cost-curve" class="sidebox panel"></div>
    </div>

    <div id="deck-detail-wrapper">
        <div id="deck-container"></div>
    </div>
    @include('layouts.commentFeed')
@endsection
@section('scripts')
    <script type="text/javascript">
        var csrf = '{{ csrf_token() }}';
        var DECK = {!! json_encode($deck) !!};
    </script>
@endsection
