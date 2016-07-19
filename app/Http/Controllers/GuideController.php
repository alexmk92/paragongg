<?php

namespace App\Http\Controllers;

use App\Card;
use App\Deck;
use App\Extensions\ParsedownParagon;
use App\Guide;
use App\Hero;
use App\Http\Requests;
use App\Http\Requests\Guide\CreateGuideRequest;
use App\Http\Requests\Guide\UpdateGuideRequest;
use App\Http\Traits\GeneratesShortcodes;
use App\Shortcode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Parsedown;
use TOC;

class GuideController extends Controller
{
    use GeneratesShortcodes;

    // Create
    public function index($hero = null)
    {
        if($hero) $hero = Hero::where('slug', $hero)->firstOrFail();
        $guides = [];

        $guides['featured'] = Guide::where('status', 'published');
        if($hero) $guides['featured'] = $guides['featured']->where('hero_code', $hero->code);
        $guides['featured'] = $guides['featured']->where('featured', true)
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->take(10)
            ->skip(0)
            ->get();

        $guides['recent'] = Guide::where('status', 'published')->where('type', 'hero');
        if($hero) $guides['recent'] = $guides['recent']->where('hero_code', $hero->code);
        $guides['recent'] = $guides['recent']->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->orderBy('updated_at', 'DESC')
            ->take(10)
            ->skip(0)
            ->get();

        $guides['rated'] = Guide::where('status', 'published')->where('type', 'hero');
        if($hero) $guides['rated'] = $guides['rated']->where('hero_code', $hero->code);
        $guides['rated'] = $guides['rated']->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->orderBy('votes', 'DESC')
            ->take(10)
            ->skip(0)
            ->get();

        $guides['views'] = Guide::where('status', 'published')->where('type', 'hero');
        if($hero) $guides['views'] = $guides['views']->where('hero_code', $hero->code);
        $guides['views'] = $guides['views']->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->orderBy('views', 'DESC')
            ->take(10)
            ->skip(0)
            ->get();

        $heroes = Hero::select('name', 'slug', 'code', 'image', 'affinities', 'created_at')
            ->get();

        return view('guides.index', compact('guides', 'heroes', 'hero'));
    }

    public function indexGameplay()
    {
        $guides = [];
        $guides['featured'] = Guide::where('status', 'published')
            ->where('featured', true)
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->take(10)
            ->skip(0)
            ->get();

        $guides['updated'] = Guide::where('status', 'published')
            ->where('type', 'gameplay')
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->orderBy('updated_at', 'DESC')
            ->take(10)
            ->skip(0)
            ->get();

        $guides['rated'] = Guide::where('status', 'published')
            ->where('type', 'gameplay')
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->orderBy('votes', 'DESC')
            ->take(10)
            ->skip(0)
            ->get();

        $guides['views'] = Guide::where('status', 'published')
            ->where('type', 'gameplay')
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->orderBy('views', 'DESC')
            ->take(10)
            ->skip(0)
            ->get();

        $guides['recent'] = Guide::where('status', 'published')
            ->where('type', 'gameplay')
            ->join('users', 'users.id', '=', 'guides.user_id')
            ->select('guides.id', 'guides.type', 'guides.title', 'user_id', 'guides.created_at', 'guides.updated_at', 'guides.views', 'guides.votes', 'hero_code', 'guides.slug', 'guides.featured', 'users.username')
            ->orderBy('created_at', 'DESC')
            ->take(10)
            ->skip(0)
            ->get();

        $heroes = Hero::select('name', 'slug', 'code', 'image', 'affinities', 'created_at')
            ->get();

        return view('guides.indexGameplay', compact('guides', 'heroes'));
    }

    // Create
    public function create()
    {
        $heroes = Hero::select('name', 'code', 'image')
            ->orderBy('name')
            ->get();

        $decks = Deck::where('author_id', auth()->user()->id)->get();

        return view('guides.create', compact('heroes', 'decks'));
    }

    // Edit
    public function edit($id)
    {
        $heroes = Hero::select('name', 'code', 'image')
            ->orderBy('name')
            ->get();

        $decks = Deck::where('author_id', auth()->user()->id)->get();

        $guide = Guide::findOrFail($id);
        return view('guides.edit', compact('guide', 'heroes', 'decks'));
    }

    // Store
    public function store(CreateGuideRequest $request)
    {
        $guide = new Guide;
        $guide->user_id   = auth()->user()->id;
        $guide->type      = $request->type;
        $guide->title     = $request->title;
        $guide->slug      = createSlug($request->title);
        $guide->body      = $request->body;

        if($guide->type == 'hero') {
            $abilityString = '';
            for($i = 1; $i < 16; $i++) {
                $current = 'ability-'.$i;
                $abilityString .= $request->$current;
                if($i < 15) {
                    $abilityString .= ',';
                }
            }
            $guide->hero_code   = $request->hero;
            $guide->abilities = $abilityString;

            // If they have embedded a deck
            if($request->has('import_type')) {
                //dd('has import type');
                if($request->import_type == 'select') {
                    $guide->deck = $request->deck_select;
                }
                if($request->import_type == 'shortcode') {
                    $deck = getDeckFromString($request->deck_shortcode);
                    if(!$deck) {
                        session()->flash('notification', 'warning|We couldn\'t find that deck. Please check the format entered.');
                        return redirect()->back();
                    }
                    $guide->deck = $deck->_id;
                }
            }
        }

        if(isset($_POST['draft'])) {
            $guide->status = 'draft';
        } else {
            $guide->status = 'published';
        }

        $guide->save();

        // Generate shortcode
        $this->generate('/guides/'.$guide->id.'/'.$guide->slug, 'guide', $guide->id);

        session()->flash('notification', 'success|Guide saved.');
        return redirect('/guides/'.$guide->id.'/'.$guide->slug);
    }

    public function update(UpdateGuideRequest $request ,$id)
    {
        $guide = Guide::findOrFail($id);

        $guide->type      = $request->type;
        $guide->title     = $request->title;
        $guide->body      = $request->body;

        if($guide->type == 'hero') {
            $abilityString = '';
            for($i = 1; $i < 16; $i++) {
                $current = 'ability-'.$i;
                $abilityString .= $request->$current;
                if($i < 15) {
                    $abilityString .= ',';
                }
            }
            $guide->hero_code   = $request->hero;
            $guide->abilities = $abilityString;

            // If they have embedded a deck
            if($request->has('import_type')) {
                //dd('has import type');
                if($request->import_type == 'select') {
                    $guide->deck = $request->deck_select;
                }
                if($request->import_type == 'shortcode') {
                    $deck = getDeckFromString($request->deck_shortcode);
                    if(!$deck) {
                        session()->flash('notification', 'warning|We couldn\'t find that deck. Please check the format entered.');
                        return redirect()->back();
                    }
                    $guide->deck = $deck->_id;
                }
            }
        }

        if(isset($_POST['draft'])) {
            $guide->status = 'draft';
        } else {
            $guide->status = 'published';
        }

        $guide->save();

        session()->flash('notification', 'success|Guide updated.');
        return redirect('/guides/'.$guide->id.'/'.$guide->slug);
    }

    // Read
    public function show($id, Request $request)
    {
        $guide  = Guide::findOrFail($id);
        if($guide->status == 'draft') {
            if(!Auth::check() || $guide->user_id != Auth::user()->id) {
                abort(404);
            }
        }
        $thread = findOrCreateThread($request->path());
        $deck   = null;
        $hero   = null;
        if($guide->type == 'hero') {
            $hero = Hero::where('code', $guide->hero_code)->first();
        }

        $guide->timestamps = false;
        $guide->increment('views');
        $guide->timestamps = true;

        if($guide->deck) {
            $deck = Deck::find($guide->deck);
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
        }

        $shortcode = Shortcode::where('resource_type', 'guide')->where('resource_id', $id)->first();
        $guideBody = (new ParsedownParagon())->text($guide->body);
        $guideBody = (new TOC\MarkupFixer())->fix($guideBody);
        $guideTOC  = (new TOC\TocGenerator())->getHtmlMenu($guideBody,2);

        return view('guides.show', compact('guide', 'guideBody', 'guideTOC', 'thread', 'deck', 'hero', 'shortcode'));
    }

    // Publish
    public function publish($id)
    {
        $guide = Guide::where('id', $id)->where('user_id', auth()->user()->id)->firstOrFail();
        $guide->status = 'published';
        $guide->save();

        session()->flash('notification', 'success|Guide has been published.');
        return redirect()->back();
    }

    // Unpublish
    public function unpublish($id)
    {
        $guide = Guide::where('id', $id)->where('user_id', auth()->user()->id)->firstOrFail();
        $guide->status = 'draft';
        $guide->save();

        session()->flash('notification', 'success|Guide has been unpublished.');
        return redirect()->back();
    }

    // Delete
    public function delete($id)
    {
        $guide = Guide::findOrFail($id);
        $guide->delete();
        return view('home');
    }

    // Strategy redirect
    public function strategy($slug)
    {
        $guide = Guide::where('slug', $slug)->firstOrFail();
        return redirect('/guides/'.$guide->id.'/'.$guide->slug);
    }
}
