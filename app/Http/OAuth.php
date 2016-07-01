<?php

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

function getOAuthLogin($code)
{
    
}

function getOAuthToken($user)
{
    // Check if current one has expired

    // If it has, use refresh token to try and get it

    // If that one has expired, force them to relink

    // Return a code
    $token = $user->oauth_token;
    return $token;
}