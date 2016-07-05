@extends('layouts/app')
@section('body')
    <div id="deck-list-wrapper">
    </div>
@endsection
@section('scripts')
<script type="text/javascript">
    var csrf = '{{ csrf_token() }}';
    var AUTHED = '{{ Auth::check() }}';
    var DECKS = {!! json_encode($decks) !!};
    var HEROES = {!! json_encode($heroes) !!};
</script>
@endsection
