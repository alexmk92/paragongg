<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class DiscussionResponse
 * @package App
 */
class DiscussionResponse extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'discussion_responses';

    /**
     * @return mixed
     */
    public function author()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
