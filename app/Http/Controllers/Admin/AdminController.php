<?php

namespace App\Http\Controllers\Admin;

use App\Job;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    function index()
    {
        return view('admin.index');
    }

    function jobs()
    {
        return view('admin.jobs');
    }

    function getJobs()
    {
        $jobs = Job::orderByRaw("FIELD(queue, 'high', 'default', 'low')")
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json($jobs);
    }
}
