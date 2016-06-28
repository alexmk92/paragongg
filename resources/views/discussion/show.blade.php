@extends('layouts/app')
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
    <div class="discussion wrapper">
        <div class="content-wrapper solo">
            <span class="breadcrumb"><a href="/discussion">Discussion</a> / <a href="/discussion/category/{{ $discussion->category }}">{{ $discussion->category }}</a> / <a href="/discussion/{{ $discussion->id }}/{{ createSlug($discussion->title) }}">{{ $discussion->title }}</a></span>
            <div class="original-post">
                <h2>{{ $discussion->title }}</h2>
                <div class="details cf">
                    <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                    <span class="username">{{ $discussion->author->username }}</span>
                    <span class="created_at">{{ $discussion->created_at->diffForHumans() }}</span>
                </div>
                <div class="article-body">
                    {!! (new Parsedown())->text($discussion->body) !!}
                </div>
            </div>
            @if($discussion->responses && $discussion->responses->count() > 0)
                @foreach($discussion->responses as $response)
                    <div class="discussion-response">
                        <div class="details cf">
                            <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                            <span class="username">{{ $response->author->username }}</span>
                            <span class="created_at">{{ $response->created_at->diffForHumans() }}</span>
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
