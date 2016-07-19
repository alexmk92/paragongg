<?php

namespace App\Http\Controllers\API;

use App\CommentThreadComment;
use App\Deck;
use App\Http\Controllers\Controller;
use App\Vote;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        if(!Auth::check()) return response()->json(['code' => 403, 'message' => 'You must be logged in to vote']);
        if(!$request->has('ref_id') || !$request->has('type')) return response()->json(['code' => 400, 'message' => 'The request is missing one or more parameters']);

        $exists = Vote::where('user_id', Auth::user()->id)->where('ref_id', (int) $request->ref_id)->where('type', $request->type)->first();
        $node = $this->getNode($request->type, $request->ref_id);
        if(!$node) return response()->json(['code' => 400, 'message' => 'This node does not exist']);

        if($exists) {
            $node->timestamps = false;
            $node->votes--;
            $node->save();
            $node->timestamps = true;
            $exists->delete();
            return response()->json(['code' => 200, 'message' => 'Vote removed successfully', 'value' => $node->votes, 'node_id' => $node->id, 'voted' => false]);
        } else {
            $vote = new Vote();
            $vote->type    = $request->type;
            $vote->user_id = Auth::user()->id;
            $vote->ref_id  = (int) $request->ref_id;
            $vote->save();

            $node->timestamps = false;
            $node->votes++;
            $node->save();
            $node->timestamps = true;

            return response()->json(['code' => 200, 'message' => 'Vote logged successfully', 'value' => $node->votes, 'node_id' => $node->id, 'voted' => true]);
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
