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

        $decks = Deck::orderBy('updated_at', 'desc')
            ->skip($skip)
            ->take($take)
            ->get();

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

        return response()->json($decks);
    }
}
