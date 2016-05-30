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
                @if(Auth::check() && Auth::user()->oauth_epic_code != null)
        var AUTHED = true;
                @else
        var AUTHED = false;
        @endif
    </script>
@endsection
