<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Guide
 * @package App
 */
class Guide extends Model
{
    /**
     * @return User
     */
    public function author()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
