<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Card;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class CardController extends Controller
{
    public function index()
    {
        $cards = Card::all();

        return response()->json($cards);
    }
    
    public function show($id)
    {
        $card = Card::where('code', $id)->firstOrFail();

        return response()->json($card);
    }
}
