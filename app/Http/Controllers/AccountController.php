<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Requests\Account\UpdatePasswordRequest;
use App\Http\Requests\Account\UpdateProfileRequest;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    // Index
    public function index()
    {
        return redirect('/account/profile');
    }

    // Edit profile (GET)
    public function editProfile()
    {
        $user = Auth::user();
        //dd($user);
        return view('account.profile')->with('user', $user);
    }

    // Edit profile (POST)
    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = Auth::user();
        $user->email     = $request->email;
        $user->website   = $request->website;
        $user->twitter   = $request->twitter;
        $user->twitch_tv = $request->twitch_tv;
        $user->bio       = $request->bio;
        $user->save();

        session()->flash('notification', 'success|Profile updated.');

        return redirect()->back();
    }

    // Edit profile (POST)
    public function linkAccount()
    {
        $user = Auth::user();
        return view('account.link')->with('user', $user);
    }

    // Edit password (GET)
    public function editPassword()
    {
        $user = Auth::user();
        return view('account.password')->with('user', $user);
    }

    // Edit password (POST)
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();
        $user->password = bcrypt($request->new_password);
        $user->save();

        session()->flash('notification', 'success|Password updated.');

        return redirect()->back();
    }

    // List a users guides
    public function guides()
    {
        $user = Auth::user();
        return view('account.guides')->with('user', $user);
    }

    // List a users decks
    public function decks()
    {
        $user = Auth::user();
        return view('account.decks')->with('user', $user);
    }
}
