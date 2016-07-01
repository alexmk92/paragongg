@extends('layouts/app')
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
    <div class="discussion wrapper">
        <div class="content-wrapper solo">
            <a class="create-post btn btn-primary" href="/discussion/create">Create a post</a>
            <span class="breadcrumb"><a href="/discussion">Discussion</a> @if(isset($category))/ <a href="/discussion/category/{{ $category}}">General</a>@endif</span>
            <h2>Discussion</h2>
            <ul class="listbox">
            @foreach($discussions as $discussion)
                 <li><a href="/discussion/{{ $discussion->id }}/{{ createSlug($discussion->title) }}" class="cf">
                     <img src="https://randomuser.me/api/portraits/women/10.jpg" class="user-avatar"/>
                     <span class="details highlight">{{ $discussion->category }}</span><span class="details">{{ $discussion->created_at->diffForHumans() }}</span>
                     <span class="content">{{ $discussion->title }}</span>
                 </a></li>
            @endforeach
            </ul>

        </div>
    </div>
@endsection
