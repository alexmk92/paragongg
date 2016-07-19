@extends('layouts/app')
@section('title')
    {{ $deck->title }} -
@endsection
@section('body')
    <div id="sidebar">
        @if (auth()->check() && $deck->author_id == auth()->user()->id)
            <div id="deck-sidebar-edit" class="sidebox panel" data-title="Edit your deck">
                <h3>Edit Deck</h3>
                <p style="padding:10px 0 20px 0;">This is one of your decks. If you'd like to make any changes click the <strong>Edit Deck</strong> button below!</p>
                <a href="{{ "/decks/edit/".$deck->id }}" class="btn btn-primary btn-full" title="Edit this deck"><i class="fa fa-pencil" aria-hidden="true"></i>Edit deck</a>
            </div>
        @endif
        <div id="deck-sidebar-list" class="sidebox panel" data-title="{{ $deck->title }}"></div>
        <div class="sidebox panel rating">
            <label>Was this guide helpful?</label>
            <a href="/vote?type=deck&ref_id={{ $deck->id }}" class="btn btn-primary btn-half">
                <i class="fa fa-star"/></i> {{ $deck->votes }} votes
            </a><div class="btn btn-primary btn-half btn-share">
                <div class="initial">
                    <i class="fa fa-retweet" aria-hidden="true"></i> Share it
                </div>
                <div class="social-buttons">
                    <a href="https://www.reddit.com/r/paragon/submit?url={{ urlencode( 'http://para.gg/'.$shortcode->code) }}&title={{ urlencode($deck->title) }}"
                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=768,width=1024');return false;"><i class="fa fa-reddit-alien" aria-hidden="true"></i></a>
                    <a href="https://twitter.com/intent/tweet?text={{ urlencode($deck->title) }}%20-%20&url={{ urlencode( 'http://para.gg/'.$shortcode->code) }}"
                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u={{ urlencode( 'http://para.gg/'.$shortcode->code) }}&t={{ urlencode($deck->title) }}"
                       onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
                </div>
            </div>
            @if($shortcode)
                <label style="margin-top: 30px;">Or use this shareable link</label>
                <input type="text" onfocus="this.select();" onmouseup="return false;" readonly="readonly" class="copypasta" value="http://para.gg/{{ $shortcode->code }}"/>
            @endif
        </div>
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
