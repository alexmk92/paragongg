<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Requests\Account\UpdatePasswordRequest;
use App\Http\Requests\Account\UpdateProfileRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

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

        if($request->hasFile('avatar')) {
            $storage = Storage::disk('s3');
            $image  = Image::make($request->file('avatar'))->resize(64,64)->stream()->getContents();

            //$image = $request->file('avatar');
            $filename = pathinfo($request->file('avatar')->getClientOriginalName(), PATHINFO_FILENAME);
            $path = uniqid(base64_encode($filename).'-',false).'.'.$request->file('avatar')->getClientOriginalExtension();
            $storage->getDriver()->put('images/users/'.$user->id.'/avatars/'.$path, $image);
            $user->avatar = $path;
        }
        $user->username  = $request->username;
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
