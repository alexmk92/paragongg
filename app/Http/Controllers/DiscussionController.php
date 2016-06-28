<?php

namespace App\Http\Controllers;

use App\Discussion;
use App\DiscussionResponse;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class DiscussionController extends Controller
{
    public function index()
    {

    }

    public function show($id)
    {
        $discussion = Discussion::findOrFail($id);

        return view('discussion.show', compact('discussion'));
    }

    public function create()
    {
        return view('discussion.create');
    }

    public function store(Requests\Discussion\CreateDiscussionRequest $request)
    {
        $discussion = new Discussion();
        $discussion->user_id  = Auth::user()->id;
        $discussion->title    = $request->title;
        $discussion->category = $request->category;
        $discussion->body     = $request->body;
        $discussion->save();

        session()->flash('notification', 'success|Your post has been saved.');
        return redirect('/discussion/'.$discussion->id.'/'.createSlug($discussion->title));
    }

    public function edit($id)
    {
        $discussion = Discussion::findOrFail($id);

        return view('discussion.edit', compact('discussion'));
    }
    
    public function update($id)
    {
        
    }

    public function reply($id, Request $request)
    {
        $discussion = Discussion::findOrFail($id);
        if(!$discussion) abort(404);
        
        $response = new DiscussionResponse();
        $response->parent_id = $id;
        $response->user_id   = Auth::user()->id;
        $response->body      = $request->body;
        $response->save();

        return redirect()->back();
    }
    
    public function delete($id)
    {
        $discussion = Discussion::findOrFail($id);
        $discussion->delete();

        return redirect()->back();
    }
}
