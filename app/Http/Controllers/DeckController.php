<?php

namespace App\Http\Controllers;

use App\Deck;
use App\Hero;
use App\Card;
use App\User;
use Auth;
use App\Http\Requests;
use Illuminate\Http\Request;

class DeckController extends Controller
{
    // Create
    public function index()
    {
        $decks = Deck::orderBy('updated_at', 'desc')->get();
        foreach($decks as $deck) {
            $uniqueCards = Card::whereIn('code', $deck->cards)->get();
            $deck->hero = Hero::where('code', $deck->hero)->first();
            $author = User::where('id', $deck->author_id)->first();
            if(count($author) == 0) {
                $author = null;
            }
            $deck->author = $author;

            $sortedCards = [
                "prime" => [],
                "equipment" => [],
                "upgrades" => [],
                "all" => []
            ];

            foreach($uniqueCards as $card) {
                switch($card->type) {
                    case "Prime": $key = "prime" ; break;
                    case "Active": $key = "equipment"; break;
                    case "Passive": $key = "equipment"; break;
                    case "Upgrade": $key = "upgrades"; break;
                    default : break;
                }

                if(count($sortedCards[$key]) == 0){
                    $card->quantity = 0;
                    array_push($sortedCards[$key], $card);
                } else {
                    if(!isset($card->quantity)) {
                        $card->quantity = 0;
                    }
                    array_push($sortedCards[$key], $card);
                }
            }
            // Find a better way to do this so we get the quants
            foreach($sortedCards['prime'] as $sortedCard) {
                foreach($deck->cards as $cardCode) {
                    if($cardCode == $sortedCard->code) {
                        $sortedCard->quantity++;
                    }
                }
            }
            foreach($sortedCards['equipment'] as $sortedCard) {
                foreach($deck->cards as $cardCode) {
                    if($cardCode == $sortedCard->code) {
                        $sortedCard->quantity++;
                    }
                }
            }
            foreach($sortedCards['upgrades'] as $sortedCard) {
                foreach($deck->cards as $cardCode) {
                    if($cardCode == $sortedCard->code) {
                        $sortedCard->quantity++;
                    }
                }
            }
            $sortedCards["all"] = array_merge($sortedCards["equipment"], $sortedCards["upgrades"], $sortedCards["prime"]);

            // Finally sorted the collection
            $deck->cards = $sortedCards;
        }
        return view('decks.index')->with('decks', $decks);
    }

    // Create
    public function create()
    {
        $heroes = Hero::select('affinities', 'code', 'name', 'image', 'images', 'baseStats')->orderBy('name', 'asc')->get();
        $cards = app('App\Http\Controllers\CardController')->getCards();
        $userId = Auth::user() ? Auth::user()->id : "null";

        return view('decks.create')->with('cards', $cards)->with('heroes', $heroes)->with('userId', $userId);
    }

    // Store
    public function store(Request $request)
    {
        $payload = json_decode($request->data);

        $user = auth()->user();
        // Store item
        $deck = new Deck;
        $deck->slug = createSlug($payload->title);
        $deck->author_id = $user ? $user->id : null;
        $deck->title = $payload->title;
        $deck->description = $payload->description;
        $deck->hero = $payload->hero;
        $deck->votes = 0;
        $deck->cards = $payload->cards;
        $deck->builds = $payload->builds;

        $deck->save();

        session()->flash('notification', 'success|Deck saved.');

        return redirect('/decks/'.$deck->slug);
    }

    public function success()
    {
        return view('decks.success');
    }

    // Read
    public function show(Request $request, $slug)
    {
        $thread = findOrCreateThread($request->path());
        $comments = $thread->comments;

        $deck = Deck::where('slug', $slug)->firstOrFail();
        // pass back a dummy object for now
        $deck->hero = Hero::where('code', $deck->hero)->firstOrFail();
        $uniqueCards = Card::whereIn('code', $deck->cards)->get();

        // Sort the cards to quantity, we set the totalCards before as this
        // will directly modify the state of the cards array, removing some
        // elements in exchange for adding a "quantity" key for each obj.
        $sortedCards = [
            "prime" => [],
            "equipment" => [],
            "upgrades" => [],
            "all" => []
        ];

        foreach($uniqueCards as $card) {
            switch($card->type) {
                case "Prime": $key = "prime" ; break;
                case "Active": $key = "equipment"; break;
                case "Passive": $key = "equipment"; break;
                case "Upgrade": $key = "upgrades"; break;
                default : break;
            }

            if(count($sortedCards[$key]) == 0){
                $card->quantity = 0;
                array_push($sortedCards[$key], $card);
            } else {
                if(!isset($card->quantity)) {
                    $card->quantity = 0;
                }
                array_push($sortedCards[$key], $card);
            }
        }
        // Find a better way to do this so we get the quants
        foreach($sortedCards['prime'] as $sortedCard) {
            foreach($deck->cards as $cardCode) {
                if($cardCode == $sortedCard->code) {
                    $sortedCard->quantity++;
                }
            }
        }
        foreach($sortedCards['equipment'] as $sortedCard) {
            foreach($deck->cards as $cardCode) {
                if($cardCode == $sortedCard->code) {
                    $sortedCard->quantity++;
                }
            }
        }
        foreach($sortedCards['upgrades'] as $sortedCard) {
            foreach($deck->cards as $cardCode) {
                if($cardCode == $sortedCard->code) {
                    $sortedCard->quantity++;
                }
            }
        }
        $sortedCards["all"] = array_merge($sortedCards["equipment"], $sortedCards["upgrades"], $sortedCards["prime"]);

        // Finally sorted the collection
        $deck->cards = $sortedCards;

        return view('decks.show')->with('deck', $deck)
            ->with('comments', $comments)
            ->with('threadId', $thread->id);
    }

    // Edit
    public function edit($id)
    {
        $deck = Deck::findOrFail($id);
        return view('decks.edit')->with('deck', $deck);
    }

    // Update
    public function update($id)
    {
        $deck = Deck::findOrFail($id);
        return view('decks.edit')->with('deck', $deck);
    }

    // Delete
    public function delete($id)
    {
        $deck = Deck::findOrFail($id);
        $deck->delete();
        return view('home');
    }
}
