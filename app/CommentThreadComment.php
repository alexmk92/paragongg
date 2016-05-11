<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommentThreadComment extends Model
{
    public function thread() {
        return $this->belongsTo('App\CommentThread', 'thread_id');
    }

    public function author() {
        return $this->belongsTo('App\User');
    }
}
