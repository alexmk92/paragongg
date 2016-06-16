<?php

namespace App\Http\Controllers\API;

use App\CommentThread;
use Illuminate\Http\Request;

use App\CommentThreadComment;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use PhpParser\Comment;

class CommentController extends Controller
{
    public function thread($id, $take)
    {
        //$thread = CommentThread::findOrFail($id);
        //$comments = $thread->comments;

        // consult with Jamie, is my way of doing this bit ok?!  When I added skip or take it would mess
        // up on the front end, no array would be returned...
        $comments = CommentThreadComment::where('thread_id', $id)->orderBy('created_at', 'desc')->get();

        return response()->json($comments);
    }

    public function store(Request $request)
    {
        $comment = new CommentThreadComment();
        $comment->body = $request->body;
        $comment->thread_id = $request->thread_id;
        $comment->parent_id = $request->parent_comment_id;
        $comment->user_id = Auth::user()->id;
        $comment->save();

        $comment = CommentThreadComment::findOrFail($comment->id);

        return response()->json(['code' => 200, 'message' => 'Message stored', 'comment' => $comment]);
    }

    public function upvote(Request $request) {
        $comment = CommentThreadComment::findOrFail($request->id);
        $comment->votes = $comment->votes + 1;

        $comment->save();

        return response()->json(['code' => 200, 'message' => 'Comment upvoted', 'comment' => $comment]);
    }


}
