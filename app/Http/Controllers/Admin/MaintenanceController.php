<?php

namespace App\Http\Controllers\Admin;

use App\Card;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Jobs\UpdateCardObject;
use Illuminate\Support\Facades\Storage;

class MaintenanceController extends Controller
{
    // Maintenance index
    function index()
    {
        return view('admin.maintenance.index');
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
            $this->dispatch(new UpdateCardObject($object, $updateImages));
        }

        session()->flash('notification', 'success|Cards update processing...');

        return redirect('/admin/jobs');
    }
}

