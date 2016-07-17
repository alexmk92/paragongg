@extends('layouts/app')
@section('title')
    Edit a Guide -
@endsection
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
    <div class="wrapper">
        <div class="content-wrapper solo">
            <h2>Edit a guide</h2>
            <p>We've tried to make sure that creating a guide on Paragon.GG is as easy as it can be. It can be a short concise guide to gameplay mechanics, or a fully fledged hero guide with embedded decks and abilities. The choice is yours. If you have any feedback on the guide making process, please make sure to reach out to us!</p>
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
                <input name="title" type="text" placeholder="e.g. A guide to winning with Murdock" onkeyup="generateSlug(this)" value="{{ $guide->title }}">

                <label><span class="required">*</span>Guide type</label>
                <select name="type" onload="heroOrGameplay(this)" onchange="heroOrGameplay(this)">
                    <option value="hero" @if($guide->type == 'hero') selected @endif>Hero guide</option>
                    <option value="gameplay"  @if($guide->type == 'gameplay') selected @endif>Gameplay guide</option>
                </select>

                <div id="hero-form">
                <label><span class="required">*</span>Which Hero will your guide be about?</label>
                <select name="hero">
                    @foreach($heroes as $hero)
                        <option value="{{ $hero->code }}" @if($guide->hero_code == $hero->code) selected @endif>{{ $hero->name }}</option>
                    @endforeach
                </select>
                <hr>
                <h5>Embed a deck into your guide</h5>
                <label><input type="radio" name="import_type" value="select" onclick="importDeckType(this)" @if($decks->count() == 0) disabled @endif> Select one of my decks on Paragon.gg</label>
                <label><input type="radio" name="import_type" value="shortcode" onclick="importDeckType(this)"> Enter a deck shortcode / Paragon.gg URL</label>
                <div class="deck-import-select">
                    <label>Choose one of your decks</label>
                    <select name="deck_select">
                        @foreach($decks as $deck)
                            <option value="{{ $deck->_id }}">{{ $deck->title }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="deck-import-shortcode">
                    <label>Enter a deck shortcode or URL</label>
                    <input type="text" name="deck_shortcode" placeholder="e.g. 474fjeiug75z">
                </div>

                <hr>
                    <h5>What abilities do you take?</h5>
                    <label>Ability matrix</label>
                    @include('guides.abilitySelectEdit')
                </div>

                <hr>
                <div class="guide-body">
                    <h5>The guide body</h5>
                    <label><span class="required">*</span> Guide content (markdown formatting available)</label>
                    <textarea name="body">{{ $guide->body }}</textarea>
                    <script>
                        var simplemde = new SimpleMDE({
                            autoDownloadFontAwesome: false,
                            placeholder: "Enter your content here...",
                            tabSize: 4,
                            indentWithTabs: false,
                            spellChecker: false,
                            hideIcons: ["preview", "side-by-side"]
                        });
                        function heroOrGameplay(element) {
                            if(element.value == "gameplay") {
                                document.getElementById('hero-form').style.display = 'none';
                            } else {
                                document.getElementById('hero-form').style.display = 'block';
                            }
                        }
                        function importDeckType(element) {
                            if(element.value == 'select') {
                                document.querySelector(".deck-import-select").style.display = 'block';
                                document.querySelector(".deck-import-shortcode").style.display = 'none';
                            } else {
                                document.querySelector(".deck-import-select").style.display = 'none';
                                document.querySelector(".deck-import-shortcode").style.display = 'block';
                            }
                        }
                    </script>
                </div>
                <hr>
                <button name="draft" type="submit" class="btn"><i class="fa fa-pencil" aria-hidden="true"></i> Save to drafts</button>
                <button name="publish" type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Publish guide</button>
            </form>
        </div>
@endsection
