@extends('layouts/app')
@section('body')
    <div id="deck-list-wrapper">
    </div>
@endsection
<script>
    var DECKS = {!! json_encode($decks) !!};
</script>
