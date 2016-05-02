<?php

namespace App\Http\Controllers;

use App\Card;
use App\Http\Requests;

class CardController extends Controller
{
    // Index
    public function index()
    {
        $cards = Card::all();

        return view('cards.index')->with('cards', $cards);
    }

    // Create
    public function create()
    {
        //$card = new Card();
        
        return view('cards.create');
    }

    // Store
    public function store()
    {
        //$card = new Card();

        return view('cards.create');
    }

    // Edit
    public function edit($slug)
    {
        $card = Card::where('slug', $slug);

        return view('cards.edit');
    }

    // Update
    public function update($slug)
    {
        $card = Card::where('slug', $slug);

        return view('cards.edit');
    }

    // Delete
    public function delete($slug)
    {
        $card = Card::where('slug', $slug)->firstOrFail();
        $card->delete();

        return view('guides.delete');
    }

    // Show
    public function show($slug)
    {
        $card = Card::where('slug', $slug)->firstOrFail();

        return view('guides.edit')->with('card', $card);
    }
}
