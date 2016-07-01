<?php

namespace App\Http\Controllers;

use App\Card;
use App\Http\Requests;
use App\Jobs\UpdateCardImage;
use App\Jobs\UpdateCardObject;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CardController extends Controller
{
    // Index
    public function index()
    {
        $cards = $this->getCards();

        return view('cards.index')->with('cards', $cards);
    }

    // Show
    public function show(Request $request, $slug)
    {
        $card = Card::where('slug', $slug)->firstOrFail();
        $thread = findOrCreateThread($request->path());

        return view('cards.show')->with('card', $card)->with('threadId', $thread->id);
    }

    public function getCards()
    {
        $cards = Card::all();
        $cardsOwned = null;

        if(Auth::check() && Auth::user()->epicAccountLinked()) {
            $cardsOwned = $this->cardCollection();

            if($cardsOwned) {
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

        }

        return $cards;
    }
    
    // Get a user's cards collection
    private function cardCollection()
    {
        $user = Auth::user();

        Cache::forget('user.'.$user->id.'.cards');
        if(!Cache::has('user.'.$user->id.'.cards')) {
            $client = new Client();
            try {
                $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$user->epic_account_id.'/cards', [
                    'headers' => [
                        'Accept'        => 'application/json',
                        'Authorization' => 'Bearer '.getOAuthToken($user),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
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
    public function edit($code)
    {
        $card = Card::where('code', $code)->get();

        return view('cards.edit')->with('card', $card);
    }

    // Update
    public function update($code, Request $request)
    {
        $updatedCard = json_decode($request->input('data'), true);
        $card = Card::where('code', $code);
        $card->update($updatedCard[0]);
        session()->flash('notification', 'success|Card saved.');

        return redirect()->back();
    }

    // Delete
    public function delete($code)
    {
        $card = Card::where('code', $code)->firstOrFail();
        $card->delete();

        return redirect()->back();
    }

    // Pull latest cards
    public function pullCards()
    {
        // Get latest cards list
        $client = new Client();
        $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/cards', [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'Bearer '.APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $response = json_decode($res);

        // Run through each cards returned
        foreach($response as $object) {
            $this->dispatch(new UpdateCardObject($object));
        }

        session()->flash('notification', 'success|Cards update processing...');

        return redirect('/admin/jobs');
    }

    public function pullCardImages()
    {
        // Get latest cards list
        $client = new Client();
        $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/cards', [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'Bearer '.APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $response = json_decode($res);

        // Run through each cards returned
        foreach($response as $object) {
            $this->dispatch(new UpdateCardImage($object));
        }

        session()->flash('notification', 'success|Card image update processing...');

        return redirect('/admin/jobs');
    }
}
