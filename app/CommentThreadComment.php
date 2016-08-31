<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CommentThreadComment
 * @package App
 */
class CommentThreadComment extends Model
{
    /**
     * @return CommentThread
     */
    public function thread() {
        return $this->belongsTo('App\CommentThread', 'thread_id');
    }

    /**
     * @return mixed
     */
    public function author() {
        return $this->belongsTo('App\User');
    }
}
