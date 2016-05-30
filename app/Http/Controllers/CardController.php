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
        $cards = getCards();

        return view('cards.index')->with('cards', $cards);
    }

    public function getCards()
    {
        $cards = Card::all('name', 'code', 'cost', 'type', 'affinity', 'rarity');
        $cardsOwned = null;

        if(Auth::check() && Auth::user()->epicAccountLinked()) {
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

        return $cards;
    }
    
    // Get a user's cards collection
    private function cardCollection()
    {
        $user = Auth::user();

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
        //$cards = new Card();
        
        return view('cards.create');
    }

    // Store
    public function store()
    {
        //$cards = new Card();

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

        return view('cards.delete');
    }

    // Show
    public function show($slug)
    {
        //$cards = Card::where('slug', $slug)->firstOrFail();    WE NEED TO IMPLEMENT SLUGS
        $card = Card::where('name', $slug)->firstOrFail();

        return view('cards.show')->with('card', $card);
    }
    
}
