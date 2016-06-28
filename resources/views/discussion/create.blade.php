@extends('layouts/app')
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
    <div class="wrapper">
        <div class="content-wrapper solo">
            <h2>Start a discussion</h2>
            <p>Ask a question, post a strategy, strike up a conversation.</p>
            <form role="form" method="POST" action="{{ Request::url() }}">
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
                <input name="title" type="text" placeholder="Choose a title for your discussion">

                <label><span class="required">*</span>Discussion Category</label>
                <select name="category">
                    <option value="general">General discussion</option>
                    <option value="theorycrafting">Theorycrafting</option>
                    <option value="questions">Questions &amp; Answers</option>
                    <option value="articles">Articles</option>
                </select>

                <hr>
                <div class="guide-body">
                    <label><span class="required">*</span> Discussion content</label>
                    <textarea name="body" placeholder="Enter your post content here..."></textarea>
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
                <hr>
                <button name="publish" type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Post discussion</button>
            </form>
        </div>
    </div>
@endsection
