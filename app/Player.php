<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model as Model;

class Player extends Model
{
    protected $connection = 'mongodb';

    public function getUsername()
    {
        if($this->username && $this->username != null)       return $this->username;
        if($this->usernamePSN && $this->usernamePSN != null) return $this->usernamePSN;
        return "-";
    }
}
