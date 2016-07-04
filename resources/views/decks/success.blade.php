@extends('layouts/app')
@section('body')
    <div id="particle-wrapper" data-theme="embers"></div>
    <div class="impact-box">
        <h3 class="section-heading">Your deck has been saved!</h3>
        <p><strong>Awesome!</strong> You can share your deck with your friends by sending them the link below.</p>
        <p>If you're logged in, you can also find your decks in your account, and optimise them further!</p>
        <input title="Link to your deck" class="copypasta" type="text" onfocus="this.select();" onmouseup="return false;" readonly="readonly" value="http://paragon.dev/{{ $shortcode }}">
        <div>
            <a href="/{{ $shortcode }}" class="btn btn-primary">View my deck</a>
        </div>
    </div>
@endsection
