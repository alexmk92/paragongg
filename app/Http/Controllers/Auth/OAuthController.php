<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OAuthController extends Controller
{
    // Index
    public function linkAccount()
    {

        // If code exists
        if(isset($_GET['code'])) {
            // If user is authenticated
            if(Auth::check()) {
                $user = Auth::user();
                $user->save();

                try {
                    getOAuthLogin($user, $_GET['code']);
                } catch(Exception $e) {
                    Log::error("Couldn't fetch OAuth token for user: ".$user->username."(".$user->id.")");
                    abort(500);
                }
                
                session()->flash('notification', 'success|Epic account linked.');

//                if(isset($_GET['state'])) {
//                    return redirect($_GET['state']);
//                }
                session()->flash('epicoauthcode', $_GET['code']);
                return redirect()->back();
            }
        } elseif (isset($_GET['error']) && $_GET['error'] == 'cancelled') {
            // If user is authenticated
            if(Auth::check()) {
                $user = Auth::user();
                $user->epic_account_id   = null;
                $user->epic_display_name = null;
                $user->oauth_token = null;
                $user->save();

                session()->flash('notification', 'danger|Something went wrong.');
                return redirect()->back();
            }
        } else {
            session()->flash('notification', 'danger|Something went wrong.');
            return redirect()->back();
        }
    }

    public function unlinkAccount()
    {
        // Log out of Epic services
        $user = Auth::user();
        $user->epic_account_id   = null;
        $user->epic_display_name = null;
        $user->oauth_token = null;
        $user->save();

        session()->flash('notification', 'success|Account unlinked.');
        return redirect()->back();
    }
}
