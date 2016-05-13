<?php

namespace App\Http\Controllers\Moderation;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ModerationController extends Controller
{
    public function index()
    {
        return "Hi mod";
    }
}
