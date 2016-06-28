<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'discussion';

    public function author()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function responses()
    {
        return $this->hasMany('App\DiscussionResponse', 'parent_id', 'id');
    }
}
