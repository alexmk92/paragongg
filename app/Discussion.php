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
     * @return mixed
     */
    public function author()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    /**
     * @return mixed
     */
    public function responses()
    {
        return $this->hasMany('App\DiscussionResponse', 'parent_id', 'id');
    }
}
