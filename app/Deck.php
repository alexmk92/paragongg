<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

class Deck extends Model
{
    protected $connection = 'mongodb';

    //protected $hidden = [ '_id', 'created_at', 'updated_at'  ];

    public function author() {
        return $this->belongsTo('App\User');
    }
}
