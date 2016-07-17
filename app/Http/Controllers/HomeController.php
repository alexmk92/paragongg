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

        if($settings->where('key', 'featuredCard')->first())
            $featuredCard = Card::where('_id', $settings->where('key', 'featuredCard')->first()->value)->first();

        if($settings->where('key', 'featuredHero')->first())
            $featuredHero = Hero::where('_id', $settings->where('key', 'featuredHero')->first()->value)->first();

        if($settings->where('key', 'featuredNews')->first())
            $featuredNews = News::where('id', $settings->where('key', 'featuredNews')->first()->value)->first();

        $featuredGuides = $this->featuredGuides();
        $topDecks = $this->topDecks();
        return view('home', compact('featuredCard', 'featuredHero', 'featuredNews', 'featuredGuides', 'topDecks'));
    }

    public function featuredGuides()
    {
        Cache::forget('featuredGuides');
        if (!Cache::has('featuredGuides')) {
            $guides = Guide::where('featured', true)->get();
            foreach($guides as $guide) {
                $guide->hero = Hero::where('code', $guide->hero_code)->first();
            }
            $expires = Carbon::now()->addMinutes(5);
            Cache::put('featuredGuides', $guides, $expires);
        }
        return Cache::get('featuredGuides');
    }

    public function topDecks()
    {
        $decks = Deck::orderBy('votes', 'DESC')->take(5)->get();
        return $decks;
    }
}
