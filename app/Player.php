<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

/**
 * Class Player
 * @package App
 */
class Player extends Model
{
    protected $connection = 'mongodb';

    /**
     * @return string
     */
    public function getUsername()
    {
        if($this->username && $this->username != null)       return $this->username;
        if($this->usernamePSN && $this->usernamePSN != null) return $this->usernamePSN;
        return "-";
    }
}
