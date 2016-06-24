<?php

namespace App\Http\Controllers\API;

use App\CommentThreadComment;
use App\Deck;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function store(Request $request)
    {
        if(!Auth::check()) return response()->json(['code' => 403, 'message' => 'You must be logged in to vote']);
        if(!$request->has('ref_id') || !$request->has('type')) return response()->json(['code' => 400, 'message' => 'The request is missing one or more parameters']);

        $exists = Vote::where('user_id', Auth::user()->id)->where('ref_id', (int) $request->id)->where('type', $request->type)->first();
        $node = $this->getNode($request->type);
        if(!$node) return response()->json(['code' => 400, 'message' => 'This node does not exist']);

        if($exists) {
            $node->votes = $node->votes --;
            $node->save();
            $exists->delete();
            return response()->json(['code' => 200, 'message' => 'Vote removed successfully']);
        } else {
            $vote = new Vote();
            $vote->type    = $request->type;
            $vote->user_id = Auth::user()->id;
            $vote->ref_id  = (int) $request->id;
            $vote->save();

            $node->votes = $node->votes ++;
            $node->save();

            return response()->json(['code' => 200, 'message' => 'Vote logged successfully']);
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