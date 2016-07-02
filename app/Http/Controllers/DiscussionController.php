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
        $discussions = Discussion::orderBy('created_at', 'DESC')
            ->paginate(10);

        return view('discussion.index', compact('discussions'));
    }

    public function category($category)
    {
        $categories = ['general', 'questions', 'theorycrafting'];
        if(!in_array($category, $categories)) abort(404);

        $discussions = Discussion::where('category', $category)
            ->orderBy('created_at', 'DESC')
            ->paginate(10);
        $category = ucfirst($category);
        return view('discussion.index', compact('discussions', 'category'));
    }

    public function show($id)
    {
        $discussion = Discussion::findOrFail($id);
        $responses  = DiscussionResponse::where('parent_id', $id)->paginate(10);
        $bestAnswer = null;

        if($discussion->accepted_answer != null) {
            $bestAnswer = DiscussionResponse::findOrFail($discussion->accepted_answer);
        }

        return view('discussion.show', compact('discussion', 'responses', 'bestAnswer'));
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

    public function bestAnswer($id, $rid)
    {
        $discussion = Discussion::where('category', 'questions')->where('id', $id)->firstOrFail();
        $response   = DiscussionResponse::where('id', $rid)->where('parent_id', $id)->firstOrFail();

        if($discussion && $response) {
            $discussion->accepted_answer = $rid;
            $discussion->save();
        } else {
            abort(404);
        }

        session()->flash('notification', 'success|Your post has been marked as answered.');
        return redirect()->back();
    }

    public function delete($id)
    {
        $discussion = Discussion::findOrFail($id);
        $discussion->delete();

        return redirect()->back();
    }
}
