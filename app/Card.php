<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

class Card extends Model
{
    protected $connection = 'mongodb';

    protected $hidden = [
        '_id', 'created_at', 'updated_at'
    ];
}
