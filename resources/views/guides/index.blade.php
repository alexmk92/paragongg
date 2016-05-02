@extends('layouts/app')
@section('scripts')
    <script type="text/javascript">
        var GUIDES = {!! json_encode($guides) !!};
    </script>
@endsection
@section('body')
    <div id="sidebar">
        @if(!empty($featured))
        <h4 class="heading">Featured guides</h4>
        @foreach($featured as $guides)
            <a class="article-preview" href="/news/{{ $article->slug }}">
                <div class="preview-details">
                    <div class="date">6 Hours Ago</div>
                    <div class="heading"><h2>{{ $article->title }}</h2></div>
                </div>
            </a>
        @endforeach
        @endif
        &nbsp;
    </div>
    <div class="wrapper bordered-right">
        <h2>Paragon guides</h2>
        <div id="guides-feed"></div>
    </div>
@endsection
