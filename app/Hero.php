<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

class Hero extends Model
{
    protected $connection = 'mongodb';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'code', 'affinities', 'type', 'role', 'attack', 'scale', 'stats', 'abilities'
    ];

    protected $hidden = [
        '_id', 'created_at', 'updated_at'
    ];
}
