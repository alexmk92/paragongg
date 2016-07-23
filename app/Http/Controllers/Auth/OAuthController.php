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
            // For testing purposes pass '/testenv' as state
            if(isset($_GET['state']) && $_GET['state'] == '/testenv') {
                return redirect("http://paragon.dev/auth?code=".$_GET['code']);
            }
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

                if(isset($_GET['state'])) {
                    return redirect($_GET['state']);
                }
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
