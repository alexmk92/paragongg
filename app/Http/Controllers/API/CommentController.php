<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\CommentThread;
use App\CommentThreadComment;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function thread($id)
    {
        $comments = CommentThreadComment::where('thread_id', $id)->where('parent_id', 0)->get();

        foreach($comments as $comment) {
            $this->getChildren($comment);
        }

        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $comment = new CommentThreadComment();
        $comment->body = $request->body;
        $comment->thread_id = $request->thread_id;
        $comment->user_id = Auth::user()->id;
        $comment->save();
    }

    private function getChildren($comment)
    {
        $children = CommentThreadComment::where('parent_id', $comment->id)->get();
        if($children) {
            $comment->children = $children;
            foreach($children as $comment) {
                $this->getChildren($comment);
            }
        }
        return $comment;
    }

}
