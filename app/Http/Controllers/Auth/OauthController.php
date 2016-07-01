<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OAuthController extends Controller
{
    // Index
    public function accountLink()
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
                
                return redirect('account/link')->with('user', Auth::user());
            }
        } elseif (isset($_GET['error']) && $_GET['error'] == 'cancelled') {
            // If user is authenticated
            if(Auth::check()) {
                $user = Auth::user();
                $user->save();

                session()->flash('notification', 'success|Epic account unlinked.');

                return redirect('account/link')->with('user', Auth::user());
            }
        } else {
            session()->flash('notification', 'danger|Something went wrong.');
            abort(403);
        }
    }
}
