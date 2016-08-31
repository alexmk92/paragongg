<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Card;
use App\Http\Requests;
use App\Http\Controllers\Controller;

/**
 * Class CardController
 * @package App\Http\Controllers\API
 */
class CardController extends Controller
{
    /**
     * @return mixed
     */
    public function index()
    {
        $cards = Card::all();

        return response()->json($cards);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
        $card = Card::where('code', $id)->firstOrFail();

        return response()->json($card);
    }

    /**
     * @param $string
     * @return mixed
     */
    public function search($string)
    {
        $string = urldecode($string);
        $card = Card::where('name', 'LIKE', '%'. $string.'%')->first();

        return response()->json($card);
    }
}
