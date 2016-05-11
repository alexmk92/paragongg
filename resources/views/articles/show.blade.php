@extends('layouts/app')
@section('body')
    <div id="sidebar">
        <h4 class="heading">More news</h4>
        @if(isset($recent) && count($recent))
            @foreach($recent as $article)
                <a class="article-preview" href="/news/{{ $article->slug }}">
                    <div class="preview-details">
                        <div class="date">6 Hours Ago</div>
                        <div class="heading"><h2>{{ $article->title }}</h2></div>
                    </div>
                </a>
            @endforeach
        @else
            <p>Sorry, we couldn't find any more recent news.</p>
        @endif
    </div>
    <article>
        <div class="article-header">
        </div>
        <h1>Iggy and Scorch something announced</h1>
        <div class="article-details">
            <time>Posted by <a href="/users/jamieshepherd">@jamieshepherd</a> on 24th April 2016, 16:25 GMT<span class="updated_at"> (Updated: 24th April 2016, 16:25 GMT)</span></time>
        </div>
        <div class="article-body">
            {!! (new Parsedown())->text($article->body) !!}
        </div>
    </article>
    <div class="" style="background: #222;">
        @if($comments)
            ASdasd

            <form onsubmit="event.preventDefault(); tsubmit();">
                <textarea id="body" name="body" placeholder="Enter your comment"></textarea>
                <button>Submit that shit</button>
            </form>

            <script type="text/javascript">
                function tsubmit() {
                    var comment = document.getElementById('body').value;

                    var httpRequest;

                    if (window.XMLHttpRequest) {
                        httpRequest = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
                    } else {
                        httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
                    }

                    httpRequest.open("POST", "/api/v1/comments/store", true);
                    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    httpRequest.setRequestHeader('X-CSRF-TOKEN', '{{ csrf_token() }}');

                    httpRequest.onreadystatechange = function () {
                        if (httpRequest.readyState === XMLHttpRequest.DONE) {
                            if (httpRequest.status === 200) {
                                console.log(httpRequest.responseText);
                                //cb({error: null, data: httpRequest.responseText})
                            } else {
                                console.log(httpRequest.responseText);
                                //cb({error: "Request failed"})
                            }
                        }

                    };

                    httpRequest.send("body=BODYBODY&thread=1");

                    console.log(comment);
                    return true;
                }
            </script>

            @foreach($comments as $comment)
                Here is a comment
            @endforeach
        @endif
    </div>
@endsection
