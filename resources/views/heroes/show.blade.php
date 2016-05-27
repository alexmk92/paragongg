@extends('layouts/app')
@section('body')
    <div id="hero-wrapper">
    </div>
@endsection
@section('scripts')
    <script type="text/javascript">
        var HEROES = {!! json_encode($heroes) !!};
        var HERO = {!! json_encode($hero) !!};
    </script>
@endsection
