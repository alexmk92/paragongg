<?php

namespace App\Http\Controllers\Moderation;

use App\News;
use App\Card;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ModerationController extends Controller
{
    public function index()
    {
        return view('moderation.index');
    }

    public function news()
    {
        $news = News::where('status', 'published')
            ->orderBy('created_at', 'DESC')
            ->get();
        return view('moderation.news')->with('news', $news);
    }

    public function cards()
    {
        $cards = Card::orderBy('name', 'ASC')
            ->get();
        return view('moderation.cards')->with('cards', $cards);
    }
}
