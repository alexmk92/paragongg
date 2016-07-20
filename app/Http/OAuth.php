<?php

use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Request;

function getOAuthLogin($user, $code)
{
    $auth = base64_encode(env('EPIC_API_CLIENT_ID').':'.env('EPIC_API_CLIENT_SECRET'));

    $client = new Client();
    try {
        $res = $client->request('POST', 'https://account-public-service-prod03.ol.epicgames.com/account/api/oauth/token', [
            'headers' => [
                'Authorization' => 'Basic ' . $auth,
                'Cache-Control' => 'no-cache',
                'Content-Type' => 'application/x-www-form-urlencoded'
            ],
            'form_params' => [
                'account_id' => $user->epic_account_id,
                'grant_type' => 'refresh_token',
                'refresh_token' => $code
            ]
        ])->getBody();
    } catch (ClientException $e) {
        $error = $e->getResponse()->getBody()->getContents();
        Log::error("ClientException while trying to get user's cards: ".$error);
        return false;
    } catch (ServerException $e) {
        $error = $e->getResponse()->getBody()->getContents();
        Log::error("ServerException while trying to get user's cards: ".$error);
        return false;
    }
    $response = json_decode($res);

    $user->epic_account_id       = $response->account_id;
    $user->oauth_token           = $response->access_token;
    $user->oauth_expires         = Carbon::now()->addSeconds($response->expires_in);
    $user->oauth_refresh_token   = $response->refresh_token;
    $user->oauth_refresh_expires = Carbon::now()->addSeconds($response->refresh_expires);

    $user->save();
}

function getOAuthToken($user)
{
    // Check if current one has expired
    if(Carbon::now() > $user->oauth_expires) {
        if(Carbon::now() > $user->oauth_refresh_expires) {
            return redirect('https://accounts.epicgames.com/login/index?state='.urlencode(Request::url()).'&client_id=8483bd1714c44d33ab64277635d68464&loginSubheading=Paragon.GG+Account+Link');
        } else {
            getOAuthLogin($user, $user->oauth_refresh_token);
        }
    }

    // Return a code
    $token = $user->oauth_token;
    return $token;
}