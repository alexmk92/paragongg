@extends('layouts/app')
@section('body')
    <h2>Cards index</h2>

@endsection
@section('scripts')
    <script>
        var cards = "{!! json_encode($cards) !!}";
    </script>
@endsection
