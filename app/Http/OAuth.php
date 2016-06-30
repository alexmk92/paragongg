<?php

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

function getOAuthToken()
{
    $user = Auth::user();
}