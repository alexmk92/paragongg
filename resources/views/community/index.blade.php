@extends('layouts/app')
@section('body')
    <div class="community">
        <h1>Community</h1>
        <div id="sidebar">
            <iframe src="https://discordapp.com/widget?id=122787649290371074&theme=dark{!!  Auth::check() ? '&username='.Auth::user()->username : '' !!}" width="100%" height="500" allowtransparency="true" frameborder="0"></iframe>
        </div>
        <div class="wrapper">
            <div class="recent-posts">
                <div class="listbox cf">
                    <h5>General discussion <a class="sub" href="/discussion/category/general">View More</a></h5>
                    <ul>
                        @if(isset($recentGeneral) && $recentGeneral->count() > 0)
                        @foreach($recentGeneral as $post)
                            <li><a href="/discussion/{{ $post->id }}/{{ createSlug($post->title) }}" class="cf">
                                    <img src="{{ getAvatar($post->author) }}" class="user-avatar"/>
                                    <span class="details highlight">{{ $post->category }}</span><span class="details">{{ $post->responses->count() }} Responses</span>
                                    <span class="content">{{ substr($post->title,0,50) }}@if(strlen($post->title) > 50)...@endif</span>
                                </a></li>
                        @endforeach
                        @else
                            <p>No recent general.</p>
                        @endif
                    </ul>
                </div>
            </div><div class="recent-posts">
                <div class="listbox cf">
                    <h5>Theorycrafting <a class="sub" href="/discussion/category/theorycrafting">View More</a></h5>
                    <ul>
                        @if(isset($recentTheorycrafting) && $recentTheorycrafting->count() > 0)
                        @foreach($recentTheorycrafting as $post)
                                <li><a href="/discussion/{{ $post->id }}/{{ createSlug($post->title) }}" class="cf">
                                    <img src="{{ getAvatar($post->author) }}" class="user-avatar"/>
                                    <span class="details highlight">{{ $post->category }}</span><span class="details">{{ $post->responses->count() }} Responses</span>
                                    <span class="content">{{ $post->title }}</span>
                                </a></li>
                        @endforeach
                        @else
                            <p>No recent theorycrafting.</p>
                        @endif
                    </ul>
                </div>
            </div><div class="recent-posts">
                <div class="listbox cf">
                    <h5>Questions &amp; Answers <a class="sub" href="/discussion/category/questions">View More</a></h5>
                    <ul>
                        @if(isset($recentQuestions) && $recentQuestions->count() > 0)
                        @foreach($recentQuestions as $post)
                                <li><a href="/discussion/{{ $post->id }}/{{ createSlug($post->title) }}" class="cf">
                                    <img src="{{ getAvatar($post->author) }}" class="user-avatar"/>
                                    <span class="details highlight">{{ $post->category }}</span><span class="details">{{ $post->responses->count() }} Responses</span>
                                    <span class="content">
                                        @if($post->accepted_answer)
                                            <i class="fa fa-check-circle answered" aria-hidden="true"></i>
                                        @else
                                            <i class="fa fa-question-circle unanswered" aria-hidden="true"></i>
                                        @endif
                                        {{ $post->title }}</span>
                                </a></li>
                        @endforeach
                        @else
                            <p>No recent questions.</p>
                        @endif
                    </ul>
                </div>
            </div><div class="recent-posts">
                <div class="listbox cf">
                    <h5>Articles <a class="sub" href="/discussion/category/articles">View More</a></h5>
                    <ul>
                        @if(isset($recentArticles) && $recentArticles->count() > 0)
                        @foreach($recentArticles as $post)
                                <li><a href="/discussion/{{ $post->id }}/{{ createSlug($post->title) }}" class="cf">
                                    <img src="{{ getAvatar($post->author) }}"/>
                                    <span class="details highlight">{{ $post->category }}</span><span class="details">{{ $post->responses->count() }} Responses</span>
                                    <span class="content">{{ $post->title }}</span>
                                </a></li>
                        @endforeach
                        @else
                            <p>No recent articles.</p>
                        @endif
                    </ul>
                </div>
            </div>
            <h2><i class="fa fa-twitch" aria-hidden="true"></i> Live streams</h2>
            @foreach($streams as $stream)
                <a class="stream-preview" href="{{ $stream->channel->url }}">
                    <div class="preview">
                        <img src="{{ $stream->preview->medium }}" />
                    </div>
                    <span class="details">
                        <span class="viewers"><i class="fa fa-user" aria-hidden="true"></i> {{ $stream->viewers }}</span>
                        <span class="name">{{ $stream->channel->display_name }}</span>
                        <span class="description">{{ $stream->channel->status }}</span>
                    </span>
                </a>
            @endforeach
        </div>
    </div>
@endsection
