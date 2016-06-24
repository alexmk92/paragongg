@extends('layouts/app')
@section('libraries')
    <script src="/js/lib/simplemde.min.js"></script>
@endsection
@section('body')
    <div class="wrapper">
        <div class="content-wrapper solo">
            <h2>Create a guide</h2>
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
                <input name="title" type="text" placeholder="e.g. A guide to winning with Murdock" onkeyup="generateSlug(this)">

                <label><span class="required">*</span>Guide type</label>
                <select name="type" onchange="heroOrGameplay(this)">
                    <option value="hero">Hero guide</option>
                    <option value="gameplay">Gameplay guide</option>
                </select>

                <div id="hero-form">
                <label><span class="required">*</span>Which Hero will your guide be about?</label>
                <select name="hero">
                    <option value="dekker">Dekker</option>
                    <option value="feng-mao">Feng Mao</option>
                    <option value="gadget">Gadget</option>
                    <option value="gideon">Gideon</option>
                    <option value="grux">Grux</option>
                    <option value="howitzer">Howitzer</option>
                    <option value="kallari">Kallari</option>
                    <option value="iggy-and-scorch">Iggy &amp; Scorch</option>
                    <option value="murdock">Murdock</option>
                    <option value="muriel">Muriel</option>
                    <option value="rampage">Rampage</option>
                    <option value="sevarog">Sevarog</option>
                    <option value="sparrow">Sparrow</option>
                    <option value="steel">Steel</option>
                    <option value="twinblast">Twinblast</option>
                </select>
                <hr>

                    <label>Deck shortcode</label>
                    <input type="text" name="deck" placeholder="e.g. 474fjeiug75z">

                    <label>Ability order</label>
                    @include('layouts.abilitySelect')
                </div>

                <hr>
                <div class="guide-body">
                    <label><span class="required">*</span> Guide content</label>
                    <textarea name="body">
## Introduction
Here's an example guide format that you can follow for a hero guide if you wish. A lot of guides will start off with a quick introduction about the hero or mechanic they're talking about. This is generally a good starting point for hero guides, but if you're writing a gameplay guide you aren't expected to cover all (or any) of these sections.

## Cards
Talk about the cards you might choose in-game. If you use the deck shortcode for a hero guide, you will actually embed your deck straight at the top. Why not use this section to discuss some of the cards and why they're good for this hero. You can also use {card:card-name} to link to a card directly in your guide.

## Abilities
Every hero has some pretty unique abilities. Try to use a section like this to briefly explain them, their strengths and weaknesses, and what you choose to max. If you completed the ability order matrix, you'll find it embedded at the top of your guide.

## Early game
Talk about the early game. The laning phase. What should your hero be focusing on? What cards should you open with?

## Mid game
When a few towers have died and both teams are starting to get a chunk of card power, what will you be doing?

## Late game
You're fully stacked or getting very close. Fights for the OP buff will be happening every time it spawns. What is your priorities in team fights, what does your final build look like?

## Conclusion
Wrap your guide up with some final words summarising what you think about the hero.
                    </textarea>
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
                <button name="draft" type="submit" class="btn"><i class="fa fa-pencil" aria-hidden="true"></i> Save to drafts</button>
                <button name="publish" type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Publish guide</button>
            </form>
        </div>
    </div>
@endsection
