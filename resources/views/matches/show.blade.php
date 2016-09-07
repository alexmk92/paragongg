@extends('layouts/app')
@section('meta_tags')
    <meta name="description" content="Match">
@endsection
@section('body')
    <div class="wrapper">
        <div class="match-details"></div>
    </div>
@endsection
@section('scripts')
    <script type="text/javascript">
        var replayId = '{{ $match->replayId }}';
        var MATCH    = {!! json_encode($match) !!}
        var HEROES = {!! json_encode($heroes) !!};
    </script>
@endsection