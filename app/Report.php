<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Report
 * @package App
 */
class Report extends Model
{
    /**
     * @return mixed
     */
    public function author() {
        return $this->belongsTo('App\User', 'user_id');
    }
}
