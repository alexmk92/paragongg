@extends('layouts/app')
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
        <div id="sidebar">
            <div class="sidebox panel">
                <h4>Discussion Categories</h4>
                <p>You're currently viewing: <strong>{{ $category or 'All' }}</strong></p>
                <ul class="side-select">
                    <li><a href="/discussion">
                            <h5>All / Everything</h5>
                            <p>Don't filter my results! Be the oracle of Paragon and view everything at once.</p>
                        </a></li>
                    <li><a href="/discussion/category/general">
                            <h5>General</h5>
                            <p>Anything and everything Paragon. Talk latest patch notes, favourite heroes, and anything else!</p>
                    </a></li>
                    <li><a href="/discussion/category/questions">
                            <h5>Questions &amp; Answers</h5>
                            <p>Have a question that need answering? Want to share your knowledge about the game? Scratch each other's backs.</p>
                    </a></li>
                    <li><a href="/discussion/category/theorycrafting">
                            <h5>Theorycrafting</h5>
                            <p>For the elite strategists. Discuss the best possible strategies, decks, and builds - often supported by hard data.</p>
                    </a></li>
                </ul>
            </div>
        </div>
        <div class="discussion-index-wrapper wrapper">
            <a class="create-post btn btn-primary" href="/discussion/create">Create a post</a>
            <span class="breadcrumb"><a href="/discussion">Discussion</a> @if(isset($category))/ <a href="/discussion/category/{{ $category}}">General</a>@endif</span>
            <h2>{{ $category or 'All Discussion'}}</h2>
            <ul class="listbox">
            @foreach($discussions as $discussion)
                 <li><a href="/discussion/{{ $discussion->id }}/{{ createSlug($discussion->title) }}" class="cf">
                     <img src="{{ getAvatar($discussion->author) }}" class="user-avatar"/>
                     <span class="details highlight">{{ $discussion->category }}</span><span class="details">{{ $discussion->created_at->diffForHumans() }}</span>
                     <span class="content">{{ $discussion->title }}</span>
                 </a></li>
            @endforeach
            </ul>

        </div>

@endsection
