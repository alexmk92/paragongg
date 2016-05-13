<?php

use Illuminate\Database\Seeder;

use App\User;

class CommentThreadCommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comment = new \App\CommentThreadComment();
        $comment->thread_id = 1;
        $comment->user_id = 1;
        $comment->body = 'Here is a comment';
        $comment->parent_id = 0;
        $comment->votes = 0;
        $comment->reports = 0;
        $comment->save();

        $comment = new \App\CommentThreadComment();
        $comment->thread_id = 1;
        $comment->user_id = 1;
        $comment->body = 'Here is a comment replying to parent comment 1';
        $comment->parent_id = 1;
        $comment->votes = 0;
        $comment->reports = 0;
        $comment->save();

        $comment = new \App\CommentThreadComment();
        $comment->thread_id = 1;
        $comment->user_id = 1;
        $comment->body = 'Here is another comment replying to parent comment 1';
        $comment->parent_id = 1;
        $comment->votes = 0;
        $comment->reports = 0;
        $comment->save();

        $comment = new \App\CommentThreadComment();
        $comment->thread_id = 1;
        $comment->user_id = 1;
        $comment->body = 'Here is a comment replying to first child of parent comment 1';
        $comment->parent_id = 2;
        $comment->votes = 0;
        $comment->reports = 0;
        $comment->save();

        $comment = new \App\CommentThreadComment();
        $comment->thread_id = 1;
        $comment->user_id = 1;
        $comment->body = 'Here is a comment';
        $comment->parent_id = 0;
        $comment->votes = 0;
        $comment->reports = 0;
        $comment->save();
    }
}
