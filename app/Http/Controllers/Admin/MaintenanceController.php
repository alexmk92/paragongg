<?php

namespace App\Http\Controllers\Admin;

use GuzzleHttp\Client;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Jobs\UpdateCardObject;
use App\Jobs\UpdateHeroObject;

class MaintenanceController extends Controller
{
    // Maintenance index
    function index()
    {
        return view('admin.maintenance.index');
    }
}

