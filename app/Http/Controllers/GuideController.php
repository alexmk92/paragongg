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
        $guides = Guide::where('status', 'published')
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'type', 'title', 'user_id', 'guides.created_at', 'votes', 'hero_code', 'slug', 'users.username')
            ->get();
        $heroes = Hero::select('name', 'code', 'image')
            ->get();

        return view('guides.index')->with('guides', $guides)->with('heroes', $heroes);
    }

    // Create
    public function create()
    {
        $heroes = Hero::select('name', 'code', 'image')
            ->orderBy('name')
            ->get();

        return view('guides.create', compact('heroes'));
    }

    // Store
    public function store(CreateGuideRequest $request)
    {
        $guide = new Guide;
        $guide->user_id   = auth()->user()->id;
        $guide->type      = $request->type;
        $guide->title     = $request->title;
        $guide->slug      = createSlug($request->title);
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
            $guide->hero_code   = $request->hero;
            $guide->abilities = $abilityString;
        }

        if(isset($_POST['draft'])) {
            $guide->status = 'draft';
        } else {
            $guide->status = 'published';
        }

        $guide->save();

        session()->flash('notification', 'success|Guide saved.');

        return redirect('/guides/'.$guide->id.'/'.$guide->slug);
    }

    // Read
    public function show($id)
    {
        $guide = Guide::findOrFail($id);
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
