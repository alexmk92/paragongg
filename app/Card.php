<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

class Card extends Model
{
    protected $connection = 'mongodb';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'code',
    ];
}
