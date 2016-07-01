@extends('layouts/app')
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
    <div class="discussion wrapper">
        <div class="content-wrapper solo wider">
            <span class="breadcrumb"><a href="/discussion">Discussion</a> / <a href="/discussion/category/{{ $discussion->category }}">{{ $discussion->category }}</a></span>
            <div class="original-post">
                <h2>{{ $discussion->title }}</h2>
                <div class="details cf">
                    <img src="{{ getAvatar($discussion->author) }}" class="user-avatar"/>
                    <span class="username">{{ $discussion->author->username }}</span>
                    <span class="created_at">{{ $discussion->created_at->diffForHumans() }}</span>
                </div>
                <div class="article-body">
                    {!! (new Parsedown())->text($discussion->body) !!}
                </div>
                @if($bestAnswer != null)
                <div class="best-answer">
                    <h5>
                        <i class="fa fa-check-circle-o" aria-hidden="true"></i> This was marked as the best answer by the thread owner</h5>
                    <div class="discussion-response">
                        <div class="details cf">
                            <img src="{{ getAvatar($discussion->author) }}" class="user-avatar"/>
                            <span class="username">{{ $bestAnswer->author->username }}</span>
                            <span class="created_at">{{ $bestAnswer->created_at->diffForHumans() }}</span>
                        </div>
                        <div class="body">{!! (new Parsedown())->text($bestAnswer->body) !!}</div>
                    </div>
                </div>
                @endif
            </div>
            @if($discussion->responses && $discussion->responses->count() > 0)
                @foreach($discussion->responses as $response)
                    <div class="discussion-response">
                        <div class="details cf">
                            <img src="{{ getAvatar($discussion->author) }}" class="user-avatar"/>
                            <span class="username">{{ $response->author->username }}</span>
                            <span class="created_at">{{ $response->created_at->diffForHumans() }}</span>
                            @if($discussion->category == 'questions')
                                <a href="/discussion/{{ $discussion->id }}/best-answer/{{ $response->id }}" class="mark-best-answer"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Mark as best answer</a>
                            @endif
                        </div>
                        <div class="body">{!! (new Parsedown())->text($response->body) !!}</div>
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
