<?php

namespace App\Http\Controllers;

use App\CommentThreadComment;
use App\Deck;
use App\Guide;
use App\Http\Controllers\Controller;
use App\Vote;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        if(!Auth::check()) {
            session()->flash('notification', 'warning|Sorry. You must be logged in to vote.');
            return redirect()->back();
        }
        if(!$_GET['ref_id'] || !$_GET['type']) {
            session()->flash('notification', 'warning|Sorry. The request is missing one or more parameters');
            return redirect()->back();
        }

        $exists = Vote::where('user_id', Auth::user()->id)->where('ref_id', $request->ref_id)->where('type', $request->type)->first();
        $node = $this->getNode($request->type, $request->ref_id);

        if(!$node) {
            session()->flash('notification', 'warning|Sorry. There was a problem logging your vote.');
            return redirect()->back();
        }

        if($exists) {
            $exists->delete();
            $node->timestamps = false;
            $node->votes--;
            $node->save();
            $node->timestamps = true;
            session()->flash('notification', 'success|Vote removed.');
            return redirect()->back();
        } else {
            $vote = new Vote();
            $vote->type    = $request->type;
            $vote->user_id = Auth::user()->id;
            $vote->ref_id  = $request->ref_id;
            $vote->save();

            $node->timestamps = false;
            $node->votes++;
            $node->save();
            $node->timestamps = true;

            session()->flash('notification', 'success|Thanks for voting!');
            return redirect()->back();
        }
    }

    public function getNode($type, $id)
    {
        if($type == 'comment') {
            return CommentThreadComment::find($id);
        }
        if($type == 'deck') {
            return Deck::find($id);
        }
        if($type == 'guide') {
            return Guide::find($id);
        }
    }
}
