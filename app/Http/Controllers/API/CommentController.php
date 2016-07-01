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
    public function thread($id)
    {
        $skip = 0;
        $take = 10;

        if(isset($_GET['skip'])) $skip = $_GET['skip'];
        if(isset($_GET['take'])) $take = $_GET['take'];

        $comments = CommentThreadComment::where('thread_id', $id)
            ->select('comment_thread_comments.*', 'users.avatar', 'users.username')
            ->join('users', 'users.id', '=', 'comment_thread_comments.user_id')
            ->orderBy('created_at', 'desc')
            ->skip($skip)
            ->take($take)
            ->get();

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

    public function delete($id)
    {
        $comment = CommentThreadComment::where('user_id', auth()->user()->id)->where('id', $id)->first();

        if(!$comment)
            return response()->json(['code' => 400, 'message' => 'Comment could not be found or bad request', 'comment' => $comment]);

        $commentChildren = CommentThreadComment::where('parent_id', $comment->id)->get();

        if($commentChildren->count > 0) {
            $comment->body = '';
            $comment->status = 'deleted';
            $comment->save();
        } else {
            $comment->delete();
        }

        return response()->json(['code' => 200, 'message' => 'Comment deleted', 'comment' => $comment]);
    }

}
