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
                    <h5>General discussion <a class="sub" href="/discussion/category/general">View More</a><a class="sub" href="/discussion/category/general">New</a></h5>
                    <ul>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                    </ul>
                </div>
            </div><div class="recent-posts">
                <div class="listbox cf">
                    <h5>Theorycrafting <a class="sub" href="/discussion/category/theorycrafting">View More</a></h5>
                    <ul>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                    </ul>
                </div>
            </div><div class="recent-posts">
                <div class="listbox cf">
                    <h5>Questions &amp; Answers <a class="sub" href="/discussion/category/questions">View More</a></h5>
                    <ul>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                    </ul>
                </div>
            </div><div class="recent-posts">
                <div class="listbox cf">
                    <h5>Articles <a class="sub" href="/discussion/category/articles">View More</a></h5>
                    <ul>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
                        <li><a href="" class="cf">
                                <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                                <span class="details highlight">Question</span><span class="details">0 Responses</span>
                                <span class="content">What is the respawn time for ju...</span>
                            </a></li>
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
