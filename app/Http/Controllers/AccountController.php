<?php

namespace App\Http\Controllers;

use App\Deck;
use App\Guide;
use App\Http\Requests;
use App\Http\Requests\Account\UpdatePasswordRequest;
use App\Http\Requests\Account\UpdateProfileRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

/**
 * Class AccountController
 * @package App\Http\Controllers
 */
class AccountController extends Controller
{
    /**
     * @return mixed
     */
    public function index()
    {
        return redirect('/account/profile');
    }

    /**
     * @return mixed
     */
    public function editProfile()
    {
        $user = Auth::user();
        return view('account.profile')->with('user', $user);
    }

    /**
     * @param UpdateProfileRequest $request
     * @return mixed
     */
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

    /**
     * @return mixed
     */
    public function linkAccount()
    {
        $user = Auth::user();
        return view('account.link')->with('user', $user);
    }

    /**
     * @return mixed
     */
    public function editPassword()
    {
        $user = Auth::user();
        return view('account.password')->with('user', $user);
    }

    /**
     * @param UpdatePasswordRequest $request
     * @return mixed
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();
        $user->password = bcrypt($request->new_password);
        $user->save();

        session()->flash('notification', 'success|Password updated.');

        return redirect()->back();
    }

    /**
     * @return mixed
     */
    public function guides()
    {
        $user = Auth::user();
        $guides = Guide::where('user_id', $user->id)->paginate(15);
        return view('account.guides', compact('user', 'guides'));
    }

    /**
     * @return mixed
     */
    public function decks()
    {
        $user = Auth::user();
        $decks = Deck::where('author_id', $user->id)->paginate(15);

        return view('account.decks', compact('user', 'decks'));
    }

    /**
     * @return bool|mixed
     */
    public function getDecks()
    {
        $user = Auth::user();

        if(!$user->epic_account_id) {
            session()->flash('notification', 'warning|You must link your Epic account before you can export decks.');
            return redirect('/account/link');
        }

        $client = new Client();
        try {
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$user->epic_account_id.'/decks', [
                'headers' => [
                    'Accept'        => 'application/json',
                    'Authorization' => 'Bearer '.getOAuthToken($user),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();
        } catch (ClientException $e) {
            $error = $e->getResponse()->getBody()->getContents();
            Log::error("ClientException while trying to get user's decks: ".$error);
            return false;
        } catch (ServerException $e) {
            $error = $e->getResponse()->getBody()->getContents();
            Log::error("ServerException while trying to get user's decks: ".$error);
            return false;
        }

        $response = json_decode($res, true);
        return $response;
    }
}
