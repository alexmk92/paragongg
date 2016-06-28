<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DiscussionResponse extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'discussion_responses';

    public function author()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
