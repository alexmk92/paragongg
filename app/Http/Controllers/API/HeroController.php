<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;

use App\Card;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class HeroController extends Controller
{
    public function show($id)
    {
        $card = Card::where('code', $id)->firstOrFail();

        return response()->json($card);
    }
}