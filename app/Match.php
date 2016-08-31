<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

/**
 * Class Match
 * @package App
 */
class Match extends Model
{
    protected $connection = 'mongodb';
    protected $dates = ['startedAt'];
}
