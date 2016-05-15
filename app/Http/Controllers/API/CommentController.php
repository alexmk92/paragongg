<?php

namespace App\Http\Controllers\API;

use App\CommentThread;
use Illuminate\Http\Request;

use App\CommentThreadComment;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function thread($id)
    {
        $thread = CommentThread::findOrFail($id);
        $comments = $thread->comments;

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


}
