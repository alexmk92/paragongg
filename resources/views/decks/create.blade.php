@extends('layouts/app')
@section('body')
    <div class="wrapper">
        <div class="content-wrapper solo">
            <h2>Build a deck</h2>
            <p>Building a deck on Paragon.gg is easy! Simply search for the cards you want in your deck, and select them to add them to your deck. Once you have a deck of up to 40 cards, you can make builds from it.</p>
            <br>
            <div class="panel">
                <br><br><br><br><br><br><br><br>
            </div>
            <form>
                <label><input type="checkbox" checked> Make this deck public</label>
                <button name="publish" type="submit" class="btn"><i class="fa fa-check" aria-hidden="true"></i> Save this deck</button>
            </form>
        </div>
    </div>
@endsection
