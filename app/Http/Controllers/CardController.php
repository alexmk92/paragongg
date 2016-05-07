<?php

namespace App\Http\Controllers;

use App\Card;
use App\Http\Requests;
use App\Jobs\UpdateCardObject;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class CardController extends Controller
{
    // Index
    public function index()
    {
        $cards = Card::all('name', 'code', 'cost', 'type', 'affinity', 'rarity');
        $cardsOwned = null;

        if(Auth::user()) {
            $cardsOwned = $this->cardCollection();

            foreach($cards as $card) {
                $key = array_search($card->code, array_column($cardsOwned, 'id'));

                if($key) {
                    $card->owned = true;
                    $card->count = $cardsOwned[$key]['count'];
                } else {
                    $card->owned = false;
                }
            }
        }

        return view('cards.index')->with('cards', $cards);
    }
    
    // Index
    public function cardCollection()
    {
        $user = Auth::user();
        //curl -X GET --header 'Accept: application/json' --header 'Authorization: Bearer 924ba60333b24c6e94b99cdf62602916' --header 'X-Epic-ApiKey: a1253524e2f442a39ea8fd592fd402a9' 'https://developer-paragon.epicgames.com/v1/account/099bc6a93f954cc6b164f2afd31aff35/cards'
        if(!Cache::has('user.'.$user->id.'.cards')) {

            $client = new Client();
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$user->epic_account_id.'/cards', [
                'headers' => [
                    'Accept'        => 'application/json',
                    'Authorization' => 'Bearer '.OAuthToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ],
                'form_params' => [
                    'grant_type' => 'authorization',
                    'code'       => $user->oauth_epic_code
                ]
            ])->getBody();
            $response = json_decode($res, true);
            $expires = Carbon::now()->addMinutes(5);

            Cache::put('user.'.$user->id.'.cards', $response, $expires);
        }

        return Cache::get('user.'.$user->id.'.cards');
    }

    // Create
    public function create()
    {
        //$card = new Card();
        
        return view('cards.create');
    }

    // Store
    public function store()
    {
        //$card = new Card();

        return view('cards.create');
    }

    // Edit
    public function edit($slug)
    {
        $card = Card::where('slug', $slug);

        return view('cards.edit');
    }

    // Update
    public function update($slug)
    {
        $card = Card::where('slug', $slug);

        return view('cards.edit');
    }

    // Delete
    public function delete($slug)
    {
        $card = Card::where('slug', $slug)->firstOrFail();
        $card->delete();

        return view('guides.delete');
    }

    // Show
    public function show($slug)
    {
        $card = Card::where('slug', $slug)->firstOrFail();

        return view('guides.edit')->with('card', $card);
    }

    // Pull latest cards
    public function updateCards()
    {
        $updateImages = false;
        if(isset($_GET['update_images']) && $_GET['update_images'] == true) $updateImages = true;
        
        // Get latest card list
        $client = new Client();
        $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/card/list', [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'Bearer '.APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $response = json_decode($res);

        // Run through each card returned
        foreach($response as $object) {
            $this->dispatch(new UpdateCardObject($object, $updateImages));
        }

        session()->flash('notification', 'success|Cards update processing...');

        return redirect('/cards');
    }
}
