@extends('layouts/app')
@section('body')
    <div class="featured-wrapper">
        <div class="featured-panel-wrapper">
            <a href="/heroes/gadget" class="featured-panel" style="background-image:url(/assets/example-panel1.jpg);">
                <div class="panel-title">
                    <span class="highlight">Featured Hero</span>
                    <h4>Gadget</h4>
                </div>
            </a>
            <a href="/cards/reptilian-claw" class="featured-panel" style="background-image:url(/assets/example-panel2.jpg);">
                <div class="panel-title">
                    <span class="highlight">Featured Card</span>
                    <h4>Reptilian Claw</h4>
                </div>
            </a>
        </div>
        <a href="/news/iggy-and-scorch-release-date-announced" class="featured-panel-main">
            <div class="panel-background anim-slowZoom" style="background-image:url(/assets/example-article-background.jpg);"></div>
            <div class="panel-title">
                <span class="highlight">Featured News</span><span>26 May 2016</span><span>12 comments</span>
                <h1>New Hero Reveal: Riktor</h1>
            </div>
        </a>
    </div>

@endsection
