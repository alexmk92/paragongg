<?php

namespace App\Http\Controllers;

use App\Guide;
use App\Http\Requests;

class GuideController extends Controller
{
    // Create
    public function index()
    {
        $guides = Guide::all();
        return view('guides.index')->with('guides', $guides);
    }

    // Create
    public function create()
    {
        return view('guides.create');
    }

    // Store
    public function store()
    {
        // Store item
        return view('guides.create');
    }

    // Read
    public function show($slug)
    {
        $guide = Guide::where('slug', $slug)->firstOrFail();
        return view('guides.show')->with('guide', $guide);
    }

    // Edit
    public function edit($id)
    {
        $guide = Guide::findOrFail($id);
        return view('guides.edit')->with('guide', $guide);
    }

    // Update
    public function update($id)
    {
        $guide = Guide::findOrFail($id);
        return view('guides.edit')->with('guide', $guide);
    }

    // Delete
    public function delete($id)
    {
        $guide = Guide::findOrFail($id);
        $guide->delete();
        return view('home');
    }
}
