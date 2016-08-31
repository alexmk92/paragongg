<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

/**
 * Class Deck
 * @package App
 */
class Deck extends Model
{
    protected $connection = 'mongodb';

    //protected $hidden = [ '_id', 'created_at', 'updated_at'  ];

    /**
     * @return mixed
     */
    public function hero() {
        return $this->hasOne('App\Hero');
    }

    /**
     * @return mixed
     */
    public function author() {
        return $this->belongsTo('App\User');
    }
}
