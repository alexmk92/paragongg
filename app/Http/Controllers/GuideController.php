<?php

namespace App\Http\Controllers;

use App\Guide;
use App\Hero;
use App\Http\Requests;
use App\Http\Requests\Guide\CreateGuideRequest;

class GuideController extends Controller
{
    // Create
    public function index()
    {
        $guides = Guide::all();
        $heroes = Hero::all();

        return view('guides.index')->with('guides', $guides)->with('heroes', $heroes);
    }

    // Create
    public function create()
    {
        return view('guides.create');
    }

    // Store
    public function store(CreateGuideRequest $request)
    {
        $guide = new Guide;
        $guide->user_id   = auth()->user()->id;
        $guide->type      = $request->type;
        $guide->title     = $request->title;
        $guide->slug      = $request->slug;
        $guide->body      = $request->body;

        if($guide->type == 'hero') {
            $abilityString = '';
            for($i = 1; $i < 16; $i++) {
                $current = 'ability-'.$i;
                $abilityString .= $request->$current;
                if($i < 15) {
                    $abilityString .= ',';
                }
            }
            $guide->deck      = $request->deck;
            $guide->hero      = $request->hero;
            $guide->abilities = $abilityString;
        }

        if(isset($_POST['draft'])) {
            $guide->status = 'draft';
        } else {
            $guide->status = 'published';
        }

        $guide->save();

        session()->flash('notification', 'success|Guide saved.');

        return redirect('/guides/show/'.$guide->slug);
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
