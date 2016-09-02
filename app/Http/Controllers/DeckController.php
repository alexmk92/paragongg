<?php

namespace App\Http\Controllers;

use App\Deck;
use App\Guide;
use App\Hero;
use App\Card;
use App\Http\Traits\ImportExportDecks;
use App\Http\Traits\RetrievesCardCollection;
use App\Jobs\ImportDeck;
use App\Lockout;
use App\Shortcode;
use App\User;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Http\Traits\GeneratesShortcodes;
use Illuminate\Support\Facades\Log;

/**
 * Class DeckController
 * @package App\Http\Controllers
 */
class DeckController extends Controller
{
    use GeneratesShortcodes, RetrievesCardCollection, ImportExportDecks;

    // Index
    /**
     * @param null $hero
     * @return mixed
     */
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
        $decks['featured'] = Deck::select('title', 'affinities', 'hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes')->where('featured', true);
        if($hero) $decks['featured'] = $decks['featured']->where('hero.code', $hero->code);
        $decks['featured'] = $decks['featured']->skip($skip)
            ->take($take)
            ->get();

        $decks['recent'] = Deck::select('title', 'affinities','hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes')->orderBy('updated_at', 'desc');
        if($hero) $decks['recent'] = $decks['recent']->where('hero.code', $hero->code);
        $decks['recent'] = $decks['recent']->skip($skip)
            ->take($take)
            ->get();
        $decks['recent'] = $this->enhanceDecks($decks['recent']);

        $decks['rated'] = Deck::select('title', 'affinities', 'hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes')->orderBy('votes', 'desc');
        if($hero) $decks['rated'] = $decks['rated']->where('hero.code', $hero->code);
        $decks['rated'] = $decks['rated']->skip($skip)
            ->take($take)
            ->get();
        $decks['rated'] = $this->enhanceDecks($decks['rated']);

        $decks['views'] = Deck::select('title', 'affinities', 'hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes')->orderBy('views', 'desc');
        if($hero) $decks['views'] = $decks['views']->where('hero.code', $hero->code);
        $decks['views'] = $decks['views']->skip($skip)
            ->take($take)
            ->get();
        $decks['views'] = $this->enhanceDecks($decks['views']);

        return view('decks.index')
            ->with('decks', $decks)
            ->with('heroes', $heroes)
            ->with('hero', $hero);
    }

    /**
     * @param $decks
     * @return mixed
     */
    protected function enhanceDecks($decks)
    {
        foreach($decks as $deck) {
            if($deck->author_id) {
                $user = User::select('username', 'avatar')->where('id', $deck->author_id)->first();
                $deck->author = $user;
            }
        }

        return $decks;
    }

    // Create
    /**
     * @return mixed
     */
    public function create()
    {
        $heroes = Hero::select('affinities', 'scale', 'code', 'name', 'slug', 'image', 'images', 'baseStats')->orderBy('name', 'asc')->get();
        $cards = app('App\Http\Controllers\CardController')->getCards();
        $userId = Auth::user() ? Auth::user()->id : "null";
        $hideGlobalNotification = true;

        return view('decks.create', compact('cards', 'heroes', 'userId', 'hideGlobalNotification', 'hideFooter'));
    }

    // Store
    /**
     * @param Request $request
     * @return mixed
     */
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
        if(isset($payload->affinities)) {
            $deck->affinities = $payload->affinities;
        }
        $deck->save();

        // Generate shortcode
        $shortcode = $this->generate('/decks/'.$deck->id.'/'.$deck->slug, 'deck', $deck->id);

        session()->flash('notification', 'success|Deck saved.');
        session()->flash('shortcode', $shortcode);

        return redirect('/decks/success');
    }

    /**
     * @return mixed
     */
    public function success()
    {
        if(session()->has('shortcode')) {
            $shortcode = session()->get('shortcode');
        } else {
            $shortcode = null;
        }

        return view('decks.success', compact('shortcode'));
    }

    /**
     * @param $id
     * @return mixed
     */
    public function copy($id)
    {
        $currentDeck = Deck::findOrFail($id);

        $heroes = Hero::select('affinities', 'scale', 'code', 'name', 'slug', 'image', 'images', 'baseStats')->orderBy('name', 'asc')->get();
        $cards = app('App\Http\Controllers\CardController')->getCards();
        $userId = Auth::user() ? Auth::user()->id : "null";
        $hideGlobalNotification = true;

        $currentDeck = $this->sortCards($currentDeck);
        $currentDeck->title = '';
        $currentDeck->description = '';
        $currentDeck->author_id = null;

        return view('decks.create', compact('currentDeck', 'cards', 'heroes', 'userId', 'hideGlobalNotification'));
    }


    /**
     * @param $id
     * @return bool
     */
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

    /**
     * @param $id
     * @param $slot
     * @return bool
     */
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

        session()->flash('notification', 'success|This deck has been saved to your Epic account. You will need to restart the Paragon client to see your changes in-game.');
        return redirect('/decks/'.$id);
    }

    /**
     * @return mixed
     */
    public function import()
    {
        $user = auth()->user();

        if(!$user->epic_account_id) {
            session()->flash('notification', 'warning|You must link your Epic account before you can import decks.');
            return redirect('/account/link');
        }

        $decks = $this->getDecks($user);

        if(!$decks) {
            session()->flash('notification', 'error|There was an error getting your decks from Epic');
            return redirect()->back();
        }

        return view('decks.import', compact('decks'));
    }

    /**
     * @param $id
     * @return mixed
     */
    public function importSave($id)
    {
        $user = auth()->user();

        $this->importToParagonGG($user, $id);

        session()->flash('notification', 'success|Deck imported to Paragon.gg');
        return redirect('/account/decks');
    }

    /**
     * @return mixed
     */
    public function importAll()
    {
        $user = auth()->user();

        $lockout = Lockout::where('user_id', $user->id)->first();
        if($lockout) {
            if($lockout->expires > Carbon::now()) {
                session()->flash('notification', 'warning|Sorry. You\'ll have to wait a little while before you can perform this action again.');
                return redirect()->back();
            } else {
                $lockout->delete();
            }
        }

        $decks = $this->getDecks($user);
        if(!$decks) {
            session()->flash('notification', 'error|There was an error getting your decks from Epic');
            return redirect()->back();
        }

        // Create lockout to stop them doing this every 10 mins
        $lockout = new Lockout();
        $lockout->user_id = $user->id;
        $lockout->expires = Carbon::now()->addMinutes(10);
        $lockout->save();

        foreach($decks as $deck) {
            if(isset($deck['hero'])) {
                $this->dispatch(new ImportDeck($user, $deck['id']));
            }
        }

        session()->flash('notification', 'success|Your decks are being imported to Paragon.gg and will be available shortly.');
        return redirect('/account/decks');
    }

    // Read
    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
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
    /**
     * @param $id
     * @return mixed
     */
    public function edit($id)
    {
        $heroes = Hero::select('affinities', 'scale', 'code', 'name', 'slug', 'image', 'images', 'baseStats')->orderBy('name', 'asc')->get();
        $cards = app('App\Http\Controllers\CardController')->getCards();
        $currentDeck = Deck::findOrFail($id);
        $userId = Auth::user() ? Auth::user()->id : "null";

        $currentDeck = $this->sortCards($currentDeck);

        return view('decks.edit', compact('cards', 'currentDeck', 'heroes', 'userId'));
    }

    /**
     * @param $currentDeck
     * @return mixed
     */
    public function sortCards($currentDeck)
    {
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

        return $currentDeck;
    }

    // Update
    /**
     * @param Request $request
     * @param $id
     * @return mixed
     */
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
            if(isset($payload->affinities)) {
                $deck->affinities = $payload->affinities;
            }
            $deck->save();

            // Generate shortcode
            $shortcode = $this->generate('/decks/'.$deck->id.'/'.$deck->slug, 'deck', $deck->id);

            session()->flash('notification', 'success|Deck successfully updated.');
            session()->flash('shortcode', $shortcode);
        }

        return redirect('/decks/'.$deck->id.'/'.$deck->slug);
    }

    // Delete
    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        $deck = Deck::findOrFail($id);
        if($deck->author_id != Auth::user()->id) abort(403);

        $deck->delete();

        $guides = Guide::where('deck', $id)->get();
        foreach($guides as $guide) {
            $guide->timestamps = false;
            $guide->deck = null;
            $guide->save();
            $guide->timestamps = true;
        }

        session()->flash('notification', 'success|Deck deleted successfully.');
        return redirect('/account/decks');
    }

    /**
     * @return mixed
     */
    public function feed()
    {
        // create new feed
        $feed = App::make("feed");

        // Set cache of feed (RSS/Atom)
        if(isset($_GET['type'])) {
            if($_GET['type'] == 'atom') {
                $feed->setCache(60, 'feedDecksKeyAtom');
            }

            if($_GET['type'] == 'rss') {
                $feed->setCache(60, 'feedDecksKeyRss');
            }
        } else {
            $feed->setCache(60, 'feedDecksKeyRss');
        }

        // check if there is cached feed and build new only if is not
        if (!$feed->isCached())
        {
            // creating rss feed with our most recent 20 records in news table
            $decks = Deck::orderBy('created_at', 'desc')->take(30)->get();

            // set your feed's title, description, link, pubdate and language
            $feed->title = 'Paragon.gg Deck Feed';
            $feed->description = 'All of the latest decks directly from Paragon.gg';
            $feed->logo = 'https://pbs.twimg.com/profile_images/755362733990764545/bTF9fM2R.jpg';
            $feed->link = url('news/feed');
            $feed->setDateFormat('datetime'); // 'datetime', 'timestamp' or 'carbon'
            $feed->pubdate = $decks->first()->created_at; // date of latest news
            $feed->lang = 'en';
            $feed->setShortening(true); // true or false
            $feed->setTextLimit(100); // maximum length of description text

            foreach ($decks as $d)
            {
                $author = User::where('id', $d->author_id)->first();
                // set item's title, author, url, pubdate, description and content
                $feed->add($d->title, $author->username, url('decks/'.$d->id.'/'.$d->slug), $d->created_at, substr($d->description,0,100), $d->description);
            }

        }

        // return your feed ('atom' or 'rss' format)
        if(isset($_GET['type'])) {
            if($_GET['type'] == 'atom') {
                return $feed->render('atom');
            }
            if($_GET['type'] == 'rss') {
                return $feed->render('rss');
            }
        }
        return $feed->render('rss');

    }
}
