<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CommentThread extends Model
{
    public function comments()
    {
        return $this->hasMany('App\CommentThreadComment', 'thread_id');
    }
}
