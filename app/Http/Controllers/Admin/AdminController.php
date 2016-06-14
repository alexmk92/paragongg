<?php

namespace App\Http\Controllers\Admin;

use App\Card;
use App\Hero;
use App\Job;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin.index');
    }

    public function jobs()
    {
        return view('admin.jobs');
    }

    public function getJobs()
    {
        $jobs = Job::orderByRaw("FIELD(queue, 'high', 'default', 'low')")
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json($jobs);
    }

    public function cards()
    {
        $cards = Card::orderBy('name', 'ASC')
            ->get();
        return view('admin.cards')->with('cards', $cards);
    }

    public function heroes()
    {
        $heroes = Hero::orderBy('name', 'ASC')
            ->get();
        return view('admin.heroes')->with('cards', $heroes);
    }
}
