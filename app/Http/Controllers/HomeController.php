<?php

namespace App\Http\Controllers;

use App\Card;
use App\Deck;
use App\Guide;
use App\Hero;
use App\Http\Requests;
use App\News;
use App\Setting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $settings = Setting::all();
        
        $featuredCard = Card::where('_id', $settings->where('key', 'featuredCard')->first()->value)->first();
        $featuredHero = Hero::where('_id', $settings->where('key', 'featuredHero')->first()->value)->first();
        $featuredNews = News::where('id', $settings->where('key', 'featuredNews')->first()->value)->first();
        $featuredGuides = $this->featuredGuides();
        $featuredDecks = $this->featuredDecks();
        return view('home', compact('featuredCard', 'featuredHero', 'featuredNews', 'featuredGuides', 'featuredDecks'));
    }

    public function featuredGuides()
    {
        if (Cache::has('featuredGuides')) {
            return Cache::get('featuredGuides');
        } else {
            $guides = Guide::where('featured', true)->get();
            foreach($guides as $guide) {
                $guide->hero = Hero::where('code', $guide->hero_code)->first();
            }
            $expires = Carbon::now()->addHours(1);
            //Cache::put('featuredGuides', $guides, $expires);
            return $guides;
        }
    }

    public function featuredDecks()
    {
        if (Cache::has('featuredDecks')) {
            return Cache::get('featuredDecks');
        } else {
            $decks = Deck::where('featured', true)->get();
            foreach($decks as $deck) {
                $deck->hero = Hero::where('code', $deck->hero_code)->first();
            }
            $expires = Carbon::now()->addHours(1);
            //Cache::put('featuredDecks', $guides, $expires);
            return $decks;
        }
    }
}
