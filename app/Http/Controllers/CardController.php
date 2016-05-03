<?php

namespace App\Http\Controllers;

use App\Card;
use App\Http\Requests;
use GuzzleHttp\Client;

class CardController extends Controller
{
    // Index
    public function index()
    {
        $cards = Card::all();

        return view('cards.index')->with('cards', $cards);
    }

    // Create
    public function create()
    {
        //$card = new Card();
        
        return view('cards.create');
    }

    // Store
    public function store()
    {
        //$card = new Card();

        return view('cards.create');
    }

    // Edit
    public function edit($slug)
    {
        $card = Card::where('slug', $slug);

        return view('cards.edit');
    }

    // Update
    public function update($slug)
    {
        $card = Card::where('slug', $slug);

        return view('cards.edit');
    }

    // Delete
    public function delete($slug)
    {
        $card = Card::where('slug', $slug)->firstOrFail();
        $card->delete();

        return view('guides.delete');
    }

    // Show
    public function show($slug)
    {
        $card = Card::where('slug', $slug)->firstOrFail();

        return view('guides.edit')->with('card', $card);
    }

    // Pull latest cards
    public function updateCards()
    {
        $updateImages = false;
        if(isset($_GET['update_images']) && $_GET['update_images'] == true) $updateImages = true;
        // Get latest card list
        $client = new Client();
        $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/card/list', [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'Bearer '.APIToken(),
                'X-Epic-ApiKey' => env('EPIC_API_KEY'),
            ]
        ])->getBody();

        $response = json_decode($res);

        // Run through each card returned
        foreach($response as $card) {
            $exists = Card::where('code', $card->id)->first();
            if(!$exists) {

                if (!file_exists('assets/images/cards/'.$card->id)) {
                    mkdir('assets/images/cards/' . $card->id, 0777, true);
                }

                Card::create(['name' => $card->name, 'code' => $card->id]);

                // BACKGROUND
                $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$card->id.'/image/background.png', [
                    'headers' => [
                        'Accept'        => 'image/png',
                        'Authorization' => 'Bearer '.APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ],
                    'save_to' => 'assets/images/cards/'.$card->id.'/background.png'
                ])->getBody();

                // ICON
                $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$card->id.'/image/icon.png', [
                    'headers' => [
                        'Accept'        => 'image/png',
                        'Authorization' => 'Bearer '.APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ],
                    'save_to' => 'assets/images/cards/'.$card->id.'/icon.png'
                ])->getBody();

            } elseif($updateImages) {

                if (!file_exists('assets/images/cards/'.$card->id)) {
                    mkdir('assets/images/cards/' . $card->id, 0777, true);
                }
                // BACKGROUND
                $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$card->id.'/image/background.png', [
                    'headers' => [
                        'Accept'        => 'image/png',
                        'Authorization' => 'Bearer '.APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ],
                    'save_to' => 'assets/images/cards/'.$card->id.'/background.png'
                ])->getBody();

                // ICON
                $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$card->id.'/image/icon.png', [
                    'headers' => [
                        'Accept'        => 'image/png',
                        'Authorization' => 'Bearer '.APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ],
                    'save_to' => 'assets/images/cards/'.$card->id.'/icon.png'
                ])->getBody();

            }
        }
    }
}
