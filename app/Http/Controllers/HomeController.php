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
        $topDecks = $this->topDecks();
        return view('home', compact('featuredCard', 'featuredHero', 'featuredNews', 'featuredGuides', 'topDecks'));
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

    public function topDecks()
    {
        if (Cache::has('topDecks')) {
            return Cache::get('topDecks');
        } else {
            $decks = Deck::orderBy('votes', 'DESC')->get();
            foreach($decks as $deck) {
                $deck->hero = Hero::where('code', $deck->hero)->first();
            }
            $expires = Carbon::now()->addHours(1);
            //Cache::put('featuredDecks', $guides, $expires);
            return $decks;
        }
    }
}
