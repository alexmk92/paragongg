<?php

namespace App\Http\Controllers;

use App\Card;
use App\Http\Requests;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class CardController extends Controller
{
    // Index
    public function index()
    {
        $cards = Card::all('name', 'code', 'cost', 'type', 'affinity', 'rarity');
        $cardsOwned = null;

        if(Auth::user()) {
            $cardsOwned = $this->cardCollection();

            foreach($cards as $card) {
                $key = array_search($card->code, array_column($cardsOwned, 'id'));

                if($key) {
                    $card->owned = true;
                    $card->count = $cardsOwned[$key]['count'];
                } else {
                    $card->owned = false;
                }
            }
        }

        return view('cards.index')->with('cards', $cards);
    }
    
    // Index
    public function cardCollection()
    {
        $user = Auth::user();
        //curl -X GET --header 'Accept: application/json' --header 'Authorization: Bearer 924ba60333b24c6e94b99cdf62602916' --header 'X-Epic-ApiKey: a1253524e2f442a39ea8fd592fd402a9' 'https://developer-paragon.epicgames.com/v1/account/099bc6a93f954cc6b164f2afd31aff35/cards'
        if(!Cache::has('user.'.$user->id.'.cards')) {

            $client = new Client();
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$user->epic_account_id.'/cards', [
                'headers' => [
                    'Accept'        => 'application/json',
                    'Authorization' => 'Bearer '.OAuthToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ],
                'form_params' => [
                    'grant_type' => 'authorization',
                    'code'       => $user->oauth_epic_code
                ]
            ])->getBody();
            $response = json_decode($res, true);
            $expires = Carbon::now()->addMinutes(5);

            Cache::put('user.'.$user->id.'.cards', $response, $expires);
        }

        return Cache::get('user.'.$user->id.'.cards');
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
        foreach($response as $object) {
            $exists = Card::where('code', $object->id)->first();
            if(!$exists) {

                if (!file_exists('assets/images/cards/'.$object->id)) {
                    mkdir('assets/images/cards/' . $object->id, 0777, true);
                }

                Card::create(['name' => $object->name, 'code' => $object->id]);

                // BACKGROUND
                $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$object->id.'/image/background.png', [
                    'headers' => [
                        'Accept'        => 'image/png',
                        'Authorization' => 'Bearer '.APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ],
                    'save_to' => 'assets/images/cards/'.$object->id.'/background.png'
                ])->getBody();

                // ICON
                $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$object->id.'/image/icon.png', [
                    'headers' => [
                        'Accept'        => 'image/png',
                        'Authorization' => 'Bearer '.APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ],
                    'save_to' => 'assets/images/cards/'.$object->id.'/icon.png'
                ])->getBody();

            }

            $cardDetails = $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$object->id, [
                'headers' => [
                    'Accept'        => 'application/json',
                    'Authorization' => 'Bearer '.APIToken(),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();

            $cardDetails = json_decode($cardDetails);

            $card = Card::where('code', $object->id)->first();
            $card->description  = $cardDetails->description;
            $card->type         = $cardDetails->type;
            $card->cost         = $cardDetails->cost;
            $card->upgradeSlots = $cardDetails->upgradeSlots;
            $card->affinity     = $cardDetails->affinity;
            $card->effects      = $cardDetails->effects;
            $card->save();

            if($updateImages) {

                if (!file_exists('assets/images/cards/'.$object->id)) {
                    mkdir('assets/images/cards/' . $object->id, 0777, true);
                }
                // BACKGROUND
                $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$object->id.'/image/background.png', [
                    'headers' => [
                        'Accept'        => 'image/png',
                        'Authorization' => 'Bearer '.APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ],
                    'save_to' => 'assets/images/cards/'.$object->id.'/background.png'
                ])->getBody();

                // ICON
                $client->request('GET', 'https://oriondata-public-service-prod09.ol.epicgames.com/v1/card/'.$object->id.'/image/icon.png', [
                    'headers' => [
                        'Accept'        => 'image/png',
                        'Authorization' => 'Bearer '.APIToken(),
                        'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                    ],
                    'save_to' => 'assets/images/cards/'.$object->id.'/icon.png'
                ])->getBody();

            }
        }
        session()->flash('notification', 'success|All cards updated.');
        return redirect('/cards');
    }
}
