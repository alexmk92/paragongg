<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class News
 * @package App
 */
class News extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'news';

    /**
     * @return mixed
     */
    public function author() {
        return $this->belongsTo('App\User', 'user_id');
    }
}
