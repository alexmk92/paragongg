@extends('layouts/app')
@section('body')
    <div id="deck-list-wrapper">
    </div>
@endsection
<script>
    var csrf = '{{ csrf_token() }}';
    var DECKS = {!! json_encode($decks) !!};
</script>
