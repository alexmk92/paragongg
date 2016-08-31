<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * Class User
 * @package App
 */
class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'oauth_token', 'oauth_expires', 'oauth_refresh_token', 'oauth_refresh_expires',
    ];

    /**
     * @return bool
     */
    public function isAdmin()
    {
        if($this->role == 'administrator') {
            return true;
        }
        return false;
    }

    /**
     * @return bool
     */
    public function isMod()
    {
        if($this->role == 'administrator' ||
           $this->role == 'moderator') {
            return true;
        }
        return false;
    }

    /**
     * @return bool
     */
    public function epicAccountLinked()
    {
        if($this->epic_account_id != null && $this->epic_account_id != null) {
            return true;
        }
        return false;
    }

    /**
     * @return News
     */
    public function newsPosts()
    {
        return $this->hasMany('App\News');
    }
}
