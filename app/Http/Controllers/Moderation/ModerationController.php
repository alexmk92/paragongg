<?php

namespace App\Http\Controllers\Moderation;

use App\Deck;
use App\Guide;
use App\Hero;
use App\Http\Traits\UpdatesSettings;
use App\News;
use App\Card;
use App\Report;
use App\Setting;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ModerationController extends Controller
{
    use UpdatesSettings;

    public function index()
    {
        return view('moderation.index');
    }

    public function news()
    {
        $news = News::where('status', 'published')
            ->orderBy('created_at', 'DESC')
            ->paginate(25);
        return view('moderation.news', compact('news'));
    }

    public function newsFrontpage($id)
    {
        $this->updateSettings('featuredNews', $id);

        session()->flash('notification', 'success|News feature saved.');
        return redirect()->back();
    }

    public function newsPromote($id)
    {
        $news = News::findOrFail($id);

        $news->timestamps = false;
        $news->featured = true;
        $news->save();
        $news->timestamps = true;

        session()->flash('notification', 'success|News promoted.');
        return redirect()->back();
    }

    public function newsDemote($id)
    {
        $news = News::findOrFail($id);

        $news->timestamps = false;
        $news->featured = false;
        $news->save();
        $news->timestamps = true;

        session()->flash('notification', 'success|News demoted.');
        return redirect()->back();
    }

    public function guides()
    {
        $guides = Guide::where('status', 'published')
            ->orderBy('created_at', 'DESC')
            ->paginate(25);

        return view('moderation.guides')->with('guides', $guides);
    }

    public function guidesFeature($id)
    {
        $guide = Guide::findOrFail($id);
        $guide->timestamps = false;
        $guide->featured = true;
        $guide->save();
        $guide->timestamps = true;

        session()->flash('notification', 'success|Guides feature saved. This may take up to 1 hour to go live.');
        return redirect()->back();
    }

    public function guidesUnfeature($id)
    {
        $guide = Guide::findOrFail($id);
        $guide->timestamps = false;
        $guide->featured = false;
        $guide->save();
        $guide->timestamps = true;

        session()->flash('notification', 'success|Guides feature saved. This may take up to 1 hour to go live.');
        return redirect()->back();
    }

    public function decks()
    {
        $decks = Deck::orderBy('created_at', 'DESC')
            ->paginate(25);
        return view('moderation.decks', compact('decks'));
    }

    public function decksFeature($id)
    {
        $deck = Deck::findOrFail($id);
        $deck->timestamps = false;
        $deck->featured = true;
        $deck->save();
        $deck->timestamps = false;

        session()->flash('notification', 'success|Decks feature saved. This may take up to 1 hour to go live.');
        return redirect()->back();
    }

    public function decksUnfeature($id)
    {
        $deck = Deck::findOrFail($id);
        $deck->timestamps = false;
        $deck->featured = true;
        $deck->save();
        $deck->timestamps = true;

        session()->flash('notification', 'success|Decks feature saved. This may take up to 1 hour to go live.');
        return redirect()->back();
    }

    public function cards()
    {
        $cards = Card::orderBy('name')->paginate(50);
        return view('moderation.cards', compact('cards'));
    }

    public function cardsFeature($id)
    {
        $this->updateSettings('featuredCard', $id);

        session()->flash('notification', 'success|Card feature saved.');
        return redirect()->back();
    }

    public function heroes()
    {
        $heroes = Hero::orderBy('name')->paginate(50);
        return view('moderation.heroes', compact('heroes'));
    }

    public function heroesFeature($id)
    {
        $this->updateSettings('featuredHero', $id);

        session()->flash('notification', 'success|Hero feature saved.');
        return redirect()->back();
    }

    public function reports()
    {
        $reports = Report::where('status', 'open')->paginate(50);
        return view('moderation.reports', compact('reports'));
    }

    public function getPatch()
    {
        $patch = Setting::where('key', 'currentPatch')->first();
        if(!$patch) {
            $patch = new Setting();
            $patch->key = 'currentPatch';
            $patch->value = 'Early Access';
            $patch->save();
        }

        return view('moderation.patch', compact('patch'));
    }

    public function setPatch(Request $request)
    {
        $this->updateSettings('currentPatch', $request->patch);
        
        session()->flash('notification', 'success|Patch updated.');
        return redirect()->back();
    }
}
