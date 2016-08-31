<?php

namespace App\Http\Traits;

use App\Deck;
use App\Hero;
use App\Shortcode;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;

/**
 * Class ImportExportDecks
 * @package App\Http\Traits
 */
trait ImportExportDecks
{
    /**
     * @param $user
     * @return bool|mixed
     */
    public function getDecks($user)
    {
        $client = new Client();
        try {
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$user->epic_account_id.'/decks', [
                'headers' => [
                    'Accept'        => 'application/json',
                    'Authorization' => 'Bearer '.getOAuthToken($user),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();
        } catch (ClientException $e) {
            $error = $e->getResponse()->getBody()->getContents();
            Log::error("ClientException while trying to get user's decks: ".$error);
            return false;
        } catch (ServerException $e) {
            $error = $e->getResponse()->getBody()->getContents();
            Log::error("ServerException while trying to get user's decks: ".$error);
            return false;
        }

        $response = json_decode($res, true);
        return $response;
    }

    /**
     * @param $user
     * @param $id
     * @return bool
     */
    public function importToParagonGG($user, $id)
    {
        $client = new Client();
        try {
            $res = $client->request('GET', 'https://developer-paragon.epicgames.com/v1/account/'.$user->epic_account_id.'/deck/'.$id, [
                'headers' => [
                    'Accept'        => 'application/json',
                    'Authorization' => 'Bearer '.getOAuthToken($user),
                    'X-Epic-ApiKey' => env('EPIC_API_KEY'),
                ]
            ])->getBody();
        } catch (ClientException $e) {
            $error = $e->getResponse()->getBody()->getContents();
            Log::error("ClientException while trying to get user's deck: ".$error);
            return false;
        } catch (ServerException $e) {
            $error = $e->getResponse()->getBody()->getContents();
            Log::error("ServerException while trying to get user's deck: ".$error);
            return false;
        }

        $data = json_decode($res, true);

        // Create cards array
        $cards = [];
        $affinities = [
            'universal' => 0,
            'fury' => 0,
            'intellect' => 0,
            'growth' => 0,
            'order' => 0,
            'corruption' => 0,
        ];

        foreach($data['cards'] as $card) {
            array_push($cards, $card['id']);
            if(count($card['linkedCards']) > 0) {
                foreach($card['linkedCards'] as $linkedCard) {
                    array_push($cards, $linkedCard['id']);
                }
            }
            $affinities[strtolower($card['affinities'][0])]++;
        }

        $deck              = new Deck();
        $deck->title       = $data['name'];
        $deck->slug        = createSlug($data['name']);
        $deck->author_id   = $user->id;
        $deck->description = null;
        $deck->hero        = Hero::where('code', $data['hero']['id'])->firstOrFail()->toArray();
        $deck->votes       = 0;

        $deck->cards       = $cards;

        $deck->builds      = [];
        $deck->affinities = $affinities;

        $deck->save();

        // Generate shortcode
        $this->generate('/decks/'.$deck->id.'/'.$deck->slug, 'deck', $deck->id);
    }
}
