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
        'name', 'code', 'description', 'type', 'cost', 'upgradeSlots', 'affinity', 'effects',
    ];

    protected $hidden = [
        '_id', 'created_at', 'updated_at'
    ];
}
