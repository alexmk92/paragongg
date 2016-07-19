<?php

namespace App\Http\Controllers\API;

use App\Deck;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Card;
use App\Hero;
use App\User;

class DeckController extends Controller
{
    public function index()
    {
        $skip = 0;
        $take = 10;

        if(isset($_GET['skip'])) $skip = (int)$_GET['skip'];
        if(isset($_GET['take'])) $take = (int)$_GET['take'];

        $decks = Deck::select('title', 'hero.image', 'hero.name', 'hero.code', 'slug', 'author_id', 'created_at', 'updated_at', 'views', 'votes');

        if(isset($_GET['hero'])) {
            $decks->where('hero.slug', $_GET['hero']);
        }
        if(isset($_GET['filter'])) {
            switch($_GET['filter']) {
                case 'featured':
                    $decks = $decks->where('featured', true);
                    break;
                case 'updated':
                    $decks = $decks->orderBy('updated_at', 'DESC');
                    break;
                case 'rated':
                    $decks = $decks->orderBy('votes', 'DESC');
                    break;
                case 'views':
                    $decks = $decks->orderBy('views', 'DESC');
                    break;
                case 'newest':
                    $decks = $decks->orderBy('created_at', 'DESC');
                    break;
            }
        }

        $decks = $decks->skip($skip)
            ->take($take)
            ->get();



        return response()->json($decks);
    }

    public function show($id)
    {
        $deck = Deck::findOrFail($id);
        return response()->json($deck);
    }
}
