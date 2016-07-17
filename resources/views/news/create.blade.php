@extends('layouts/app')
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
    <div class="wrapper">
        <div class="content-wrapper solo">
            <span class="breadcrumb"><a href="/news">News</a> / <a href="/news/create">Create</a></span>
            <h2>Write a post</h2>
            <p>Use the form below to create a new article or news post on Paragon.gg.</p>
            <form role="form" method="POST" action="{{ Request::url() }}" enctype="multipart/form-data">
                @if (count($errors) > 0)
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                {!! csrf_field() !!}
                <hr>
                <label><span class="required">*</span>Title</label>
                <input name="title" type="text" placeholder="Enter the article title here" onkeyup="generateSlug(this)">

                <label>URL Slug (if needed specifically for SEO)</label>
                <input name="slug" id="url-slug" type="text" placeholder="e.g. my-news-title">

                <label><span class="required">*</span>Article type</label>
                <select name="type" onchange="heroOrGameplay(this)">
                    <option value="news">News</option>
                    <option value="feature">Feature</option>
                </select>

                <label><span class="required">*</span>Article header (Please 300px height only)</label>
                <input type="file" name="header">

                <label><span class="required">*</span>Article thumbnail</label>
                <input type="file" name="thumbnail">

                <label>Article impact image (Large HD image for front page)</label>
                <input type="file" name="impact">

                <div class="article-body">
                    <label><span class="required">*</span> Article body</label>
                    <textarea name="body">
## Introduction
You can use markdown formatting to create a news post.</textarea>
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
                </div>
                <label>Source (if any)</label>
                <input name="source" type="text" placeholder="e.g. http://paragon.com/blog">
                <hr>
                <button name="draft" type="submit" class="btn"><i class="fa fa-pencil" aria-hidden="true"></i> Save to drafts</button>
                <button name="publish" type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Publish article</button>
            </form>
        </div>
    </div>
@endsection
