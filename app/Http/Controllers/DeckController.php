<?php

namespace App\Http\Controllers;

use App\Deck;
use App\Hero;
use App\Card;
use App\Http\Traits\RetrievesCardCollection;
use App\Shortcode;
use App\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Traits\GeneratesShortcodes;
use Illuminate\Support\Facades\Log;

class DeckController extends Controller
{
    use GeneratesShortcodes, RetrievesCardCollection;

    // Create
    public function index($hero = null)
    {
        if($hero) $hero = Hero::select('name','slug','code')->where('slug', $hero)->firstOrFail();
        $skip = 0;
        $take = 10;

        if(isset($_GET['skip'])) $skip = $_GET['skip'];
        if(isset($_GET['take'])) $take = $_GET['take'];

        $heroes = Hero::select('name', 'slug', 'code', 'image', 'affinities')
            ->get();

        $decks = [];
        $decks['featured'] = Deck::select('title', 'hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes')->where('featured', true);
        if($hero) $decks['featured'] = $decks['featured']->where('hero.code', $hero->code);
        $decks['featured'] = $decks['featured']->skip($skip)
            ->take($take)
            ->get();

        $decks['recent'] = Deck::select('title', 'hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes')->orderBy('updated_at', 'DESC');
        if($hero) $decks['recent'] = $decks['recent']->where('hero.code', $hero->code);
        $decks['recent'] = $decks['recent']->skip($skip)
            ->take($take)
            ->get();

        $decks['rated'] = Deck::select('title', 'hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes')->orderBy('votes', 'DESC');
        if($hero) $decks['rated'] = $decks['rated']->where('hero.code', $hero->code);
        $decks['rated'] = $decks['rated']->skip($skip)
            ->take($take)
            ->get();

        $decks['views'] = Deck::select('title', 'hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes')->orderBy('views', 'DESC');
        if($hero) $decks['views'] = $decks['views']->where('hero.code', $hero->code);
        $decks['views'] = $decks['views']->skip($skip)
            ->take($take)
            ->get();

        return view('decks.index')
            ->with('decks', $decks)
            ->with('heroes', $heroes)
            ->with('hero', $hero);
    }

    protected function sortDecks($decks)
    {
        foreach($decks as $deck) {
            $uniqueCards = Card::whereIn('code', $deck->cards)->get();
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

        return $decks;
    }

    // Create
    public function create()
    {
        $heroes = Hero::select('affinities', 'code', 'name', 'slug', 'image', 'images', 'baseStats')->orderBy('name', 'asc')->get();
        $cards = app('App\Http\Controllers\CardController')->getCards();
        $userId = Auth::user() ? Auth::user()->id : "null";
        $hideGlobalNotification = true;

        return view('decks.create', compact('cards', 'heroes', 'userId', 'hideGlobalNotification'));
    }

    // Store
    public function store(Request $request)
    {
        $payload = json_decode($request->data);

        $user = auth()->user();
        // Store item
        $deck              = new Deck();
        $deck->slug        = createSlug($payload->title);
        $deck->author_id   = $user ? $user->id : null;
        $deck->title       = $payload->title;
        $deck->description = $payload->description;
        $deck->hero        = Hero::where('code', $payload->hero)->firstOrFail()->toArray();
        $deck->votes       = 0;
        $deck->cards       = $payload->cards;
        $deck->builds      = $payload->builds;
        $deck->save();

        // Generate shortcode
        $shortcode = $this->generate('/decks/'.$deck->id.'/'.$deck->slug, 'deck', $deck->id);

        session()->flash('notification', 'success|Deck saved.');
        session()->flash('shortcode', $shortcode);

        return redirect('/decks/success');
    }

    public function success()
    {
        if(session()->has('shortcode')) {
            $shortcode = session()->get('shortcode');
        } else {
            $shortcode = null;
        }

        return view('decks.success', compact('shortcode'));
    }

    public function export($id)
    {
        $user = auth()->user();
        $newDeck = Deck::findOrFail($id);

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
        $occupied = new Collection();
        $vacant   = new Collection();
        foreach($response as $item) {
            if(isset($item['hero'])) {
                $hero = Hero::select('image')->where('code', $item['hero']['id'])->first();
                $item['image'] = $hero->image;
                $occupied->push($item);
            } else {
                $code = $newDeck->hero['code'];
                $hero = Hero::select('image')->where('code', $code)->first();
                $item['image'] = $hero->image;
                $vacant->push($item);
            }
        }

        return view('decks.export', compact('user', 'newDeck', 'occupied', 'vacant'));
    }

    public function exportSave($id, $slot)
    {
        $user = auth()->user();
        $collection = collect($this->getCardCollection($user));
        $deck = Deck::findOrFail($id);
        $cards = [];

        // NUMBERED
        $deck_counted = array_count_values($deck->cards);

        foreach($deck_counted as $card => $deckCount) {
            $userCount = $collection->where('id', $card)->first()['count'];

            // Add as many of this card as the user owns
            if($userCount >= $deckCount) {
                for($deckCount; $userCount >= $deckCount && $deckCount > 0; $deckCount--) {
                    $item['id'] = $card;
                    //$item['linkedIds'] = array();
                    array_push($cards, $item);
                    $userCount--;
                }
            }
        }

        $client = new Client();
        try {
            $res = $client->request('PUT', 'https://developer-paragon.epicgames.com/v1/account/'.$user->epic_account_id.'/deck/'.$slot, [
                'json' => [
                    'name'   => $deck->title,
                    'heroId' => $deck->hero['code'],
                    'cards'  => $cards
                ],
                // Because default Guzzle headers won't work for some reason
                'curl' => [
                    CURLOPT_HTTPHEADER => array(
                        "accept: application/json",
                        "authorization: Bearer ".getOAuthToken($user),
                        "cache-control: no-cache",
                        "content-type: application/json",
                        "x-epic-apikey: ".env('EPIC_API_KEY')
                    ),
                ]
            ])->getBody();
        } catch (ClientException $e) {
            dd($e->getResponse()->getBody()->getContents());
            $error = $e->getResponse()->getBody()->getContents();
            Log::error("ClientException while trying to save user's deck: ".$error);
            return false;
        } catch (ServerException $e) {
            dd($e->getResponse()->getBody()->getContents());
            $error = $e->getResponse()->getBody()->getContents();
            Log::error("ServerException while trying to save's user's deck: ".$error);
            return false;
        }

        session()->flash('notification', 'success|This deck has been saved to your Epic account.');
        return redirect('/decks/'.$id);
    }

    // Read
    public function show(Request $request, $id)
    {
        $thread = findOrCreateThread($request->path());

        $deck = Deck::findOrFail($id);

        $deck->timestamps = false;
        $deck->increment('views');
        $deck->timestamps = true;

        // pass back a dummy object for now
        //$deck->hero = Hero::where('code', $deck->hero)->firstOrFail();
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

        $shortcode = Shortcode::where('resource_type', 'deck')->where('resource_id', $id)->first();

        return view('decks.show', compact('deck', 'thread', 'shortcode'));
    }

    // Edit
    public function edit($id)
    {
        $heroes = Hero::select('affinities', 'code', 'name', 'slug', 'image', 'images', 'baseStats')->orderBy('name', 'asc')->get();
        $cards = app('App\Http\Controllers\CardController')->getCards();
        $currentDeck = Deck::findOrFail($id);
        $userId = Auth::user() ? Auth::user()->id : "null";

        // pass back a dummy object for now
        //$currentDeck->hero = Hero::where('code', $currentDeck->hero)->firstOrFail();
        $uniqueCards = Card::whereIn('code', $currentDeck->cards)->get();

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
            foreach($currentDeck->cards as $cardCode) {
                if($cardCode == $sortedCard->code) {
                    $sortedCard->quantity++;
                }
            }
        }
        foreach($sortedCards['equipment'] as $sortedCard) {
            foreach($currentDeck->cards as $cardCode) {
                if($cardCode == $sortedCard->code) {
                    $sortedCard->quantity++;
                }
            }
        }
        foreach($sortedCards['upgrades'] as $sortedCard) {
            foreach($currentDeck->cards as $cardCode) {
                if($cardCode == $sortedCard->code) {
                    $sortedCard->quantity++;
                }
            }
        }
        $sortedCards["all"] = array_merge($sortedCards["equipment"], $sortedCards["upgrades"], $sortedCards["prime"]);

        // Finally sorted the collection
        $currentDeck->cards = $sortedCards;

        // Set the cards in the builds:
        foreach($currentDeck->builds as $build) {
            foreach($build["slots"] as $slot) {
                if($slot["card"]) {
                    foreach($sortedCards["all"] as $card) {
                        if($slot["card"] === $card->code) {
                            $slot["card"] = $card;
                        }
                    }
                    foreach($slot["upgrades"] as $upgradeSlot) {}
                }
            }
        }

        return view('decks.edit')->with('cards', $cards)->with('currentDeck', $currentDeck)->with('heroes', $heroes)->with('userId', $userId);
    }

    // Update
    public function update(Request $request, $id)
    {
        $payload = json_decode($request->data);

        //dd($payload);
        $user = auth()->user();
        // Store item
        $deck = Deck::findOrFail($id);
        if($user->id === $deck->author_id) {
            $deck->slug        = createSlug($payload->title);
            $deck->title       = $payload->title;
            $deck->description = $payload->description;
            $deck->hero        = Hero::where('code', $payload->hero)->firstOrFail()->toArray();
            $deck->cards       = $payload->cards;
            $deck->builds      = $payload->builds;
            $deck->save();

            // Generate shortcode
            $shortcode = $this->generate('/decks/'.$deck->id.'/'.$deck->slug, 'deck', $deck->id);

            session()->flash('notification', 'success|Deck successfully updated.');
            session()->flash('shortcode', $shortcode);
        }

        return redirect('/decks/'.$deck->id.'/'.$deck->slug);
    }

    // Delete
    public function delete($id)
    {
        $deck = Deck::findOrFail($id);
        $deck->delete();
        return view('home');
    }
}
