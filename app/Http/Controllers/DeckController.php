<?php

namespace App\Http\Controllers;

use App\Deck;
use App\Hero;
use App\Http\Requests;

class DeckController extends Controller
{
    // Create
    public function index()
    {
        $decks = Deck::all();
        return view('decks.index')->with('decks', $decks);
    }

    // Create
    public function create()
    {
        $heroes = Hero::select('affinities', 'code', 'name')->get();
        $cards = app('App\Http\Controllers\CardController')->getCards();
        return view('decks.create')->with('cards', $cards)->with('heroes', $heroes);
    }

    // Store
    public function store()
    {
        // Store item
        return view('decks.create');
    }

    // Read
    public function show($slug)
    {
        $deck = Deck::where('slug', $slug)->firstOrFail();
        return view('decks.show')->with('deck', $deck);
    }

    // Edit
    public function edit($id)
    {
        $deck = Deck::findOrFail($id);
        return view('decks.edit')->with('deck', $deck);
    }

    // Update
    public function update($id)
    {
        $deck = Deck::findOrFail($id);
        return view('decks.edit')->with('deck', $deck);
    }

    // Delete
    public function delete($id)
    {
        $deck = Deck::findOrFail($id);
        $deck->delete();
        return view('home');
    }
}
