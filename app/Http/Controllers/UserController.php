<?php

namespace App\Http\Controllers;

use App\User;
use App\Http\Requests;

class UserController extends Controller
{
    // Show
    public function show($username)
    {
        $user = User::where('username', $username)->firstOrFail();
        return view('users.show')->with('user', $user);
    }
}
