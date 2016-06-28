@extends('layouts/app')
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
    <div class="discussion wrapper">
        <div class="content-wrapper solo">
            <h2>{{ $discussion->title }}</h2>
            <div class="article-body">
                {!! (new Parsedown())->text($discussion->body) !!}
            </div>
            @if($discussion->responses && $discussion->responses->count() > 0)
                @foreach($discussion->responses as $response)
                    <div class="discussion-response">
                        <div class="details">
                            {{ $response->author->username }}
                        </div>
                        {!! (new Parsedown())->text($response->body) !!}
                    </div>
                @endforeach
            @endif
            <div class="post-response">
                <h3 class="section-heading">Reply to this</h3>
                <form action="/discussion/{{ $discussion->id }}/reply" method="POST">
                    {!! csrf_field() !!}
                    <textarea name="body" placeholder="Write a response to this discussion..."></textarea>
                    <script>
                        var simplemde = new SimpleMDE({
                            autoDownloadFontAwesome: false,
                            placeholder: "Enter your content here...",
                            tabSize: 4,
                            indentWithTabs: false,
                            spellChecker: false,
                            hideIcons: ["preview", "side-by-side"]
                        });
                    </script>
                    <button class="btn btn-primary" type="submit">Post your reply</button>
                </form>
            </div>
        </div>
    </div>
@endsection
