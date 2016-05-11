<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\CommentThreadComment;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $comment = new CommentThreadComment();
        $comment->body = $request->body;
        $comment->thread_id = 1;
        $comment->user_id = Auth::user()->id;
        $comment->save();
    }
}
