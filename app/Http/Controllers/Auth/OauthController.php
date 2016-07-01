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
                    $this->login($user, $_GET['code']);
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

    public function login($user, $code)
    {
        $auth = base64_encode(env('EPIC_API_CLIENT_ID').':'.env('EPIC_API_CLIENT_SECRET'));

        $client = new Client();
        $res = $client->request('POST', 'https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/token', [
            'headers' => [
                'Authorization' => 'Basic '.$auth,
                'Cache-Control'     => 'no-cache',
                'Content-Type'      => 'application/x-www-form-urlencoded'
            ],
            'form_params' => [
                'grant_type' => 'authorization_code',
                'code'       => $code
            ]
        ])->getBody();
        $response = json_decode($res);

        $user->epic_account_id       = $response->account_id;
        $user->oauth_token           = $response->access_token;
        $user->oauth_expires         = Carbon::now()->addSeconds($response->expires_in);
        $user->oauth_refresh_token   = $response->refresh_token;
        $user->oauth_refresh_expires = Carbon::now()->addSeconds($response->refresh_expires);

        $user->save();
    }
}
