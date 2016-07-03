@extends('layouts/app')
@section('body')
    <div id="particle-wrapper" data-theme="embers">
    </div>
    <div class="create-success">
        <h3 class="section-heading">Your deck has been saved!</h3>
        <p><strong>Awesome!</strong> You can share your deck with your friends by sending them the link below.</p>
        <input class="copypasta" type="text" onfocus="this.select();" onmouseup="return false;" readonly="readonly" value="http://paragon.dev/{{ $shortcode }}">
        <div>
            <a href="" class="btn btn-primary">View my deck</a>
        </div>
    </div>
@endsection
