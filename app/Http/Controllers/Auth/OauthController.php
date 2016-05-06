<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class OauthController extends Controller
{
    // Index
    public function accountLink()
    {
        // If code exists
        if(isset($_GET['code'])) {
            // If user is authenticated
            if(Auth::check()) {
                $user = Auth::user();
                $user->oauth_epic_code = $_GET['code'];
                $user->save();

                OAuthToken();
                
                session()->flash('notification', 'success|Epic account linked.');
                
                return redirect('account/link')->with('user', Auth::user());
            }
        } else {
            session()->flash('notification', 'danger|Something went wrong.');
            abort(403);
        }
    }
}
