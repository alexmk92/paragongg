<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Discussion
 * @package App
 */
class Discussion extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'discussion';

    /**
     * @return User
     */
    public function author()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    /**
     * @return DiscussionResponse
     */
    public function responses()
    {
        return $this->hasMany('App\DiscussionResponse', 'parent_id', 'id');
    }
}
