<?php

namespace App\Http\Controllers;

use App\Card;
use App\Http\Requests;
use App\Http\Traits\RetrievesCardCollection;
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

/**
 * Class CardController
 * @package App\Http\Controllers
 */
class CardController extends Controller
{
    use RetrievesCardCollection;
    // Index
    /**
     * @return mixed
     */
    public function index()
    {
        $cards = $this->getCards();

        return view('cards.index')->with('cards', $cards);
    }

    // Show
    /**
     * @param Request $request
     * @param $slug
     * @return mixed
     */
    public function show(Request $request, $slug)
    {
        $card = Card::where('slug', $slug)->first();
        if(!$card) {
            $card = Card::where('name', 'LIKE', '%'. $slug.'%')->firstOrFail();
            return redirect('/cards/'.$card->slug);
        }
        $thread = findOrCreateThread($request->path());

        return view('cards.show', compact('card', 'thread'));
    }

    /**
     * @return mixed
     */
    public function getCards()
    {
        $cards = Card::select('name', 'damageType', 'code', 'slug', 'type', 'cost', 'upgradeSlots', 'affinity', 'rarity', 'effects', 'maxedEffects', 'background', 'icon')->get();
        $cardsOwned = null;

        if(getenv('APP_ENV') == 'local') {
            return $cards;
        }

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
    /**
     * @return bool
     */
    public function cardCollection()
    {
        return $this->getCardCollection(Auth::user());
    }

    // Create
    /**
     * @return mixed
     */
    public function create()
    {
        //$cards = new Card();
        
        return view('cards.create');
    }

    // Store
    /**
     * @return mixed
     */
    public function store()
    {
        //$cards = new Card();

        return view('cards.create');
    }

    // Edit
    /**
     * @param $code
     * @return mixed
     */
    public function edit($code)
    {
        $card = Card::where('code', $code)->get();

        return view('cards.edit')->with('card', $card);
    }

    // Update
    /**
     * @param $code
     * @param Request $request
     * @return mixed
     */
    public function update($code, Request $request)
    {
        $updatedCard = json_decode($request->input('data'), true);
        $card = Card::where('code', $code);
        $card->update($updatedCard[0]);
        session()->flash('notification', 'success|Card saved.');

        return redirect()->back();
    }

    // Delete
    /**
     * @param $code
     * @return mixed
     */
    public function delete($code)
    {
        $card = Card::where('code', $code)->firstOrFail();
        $card->delete();

        return redirect()->back();
    }

    // Pull latest cards
    /**
     * @return mixed
     */
    public function pullCards()
    {
        // Get our current cards list
        $cards = Card::all();

        //dd($cards);

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

        // If card doesn't exist anymore, delete it
        foreach($cards as $card) {
            if(!is_value_in_array($card->code, $response)) {
                $card->delete();
            }
        }

        // Run through each cards returned
        foreach($response as $object) {
            $this->dispatch(new UpdateCardObject($object));
        }

        session()->flash('notification', 'success|Cards update processing...');

        return redirect('/admin/jobs');
    }
}
