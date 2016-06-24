<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function store($id)
    {
        if(!Auth::check()) abort(403);
        $report = new Report();
        $report->user_id = Auth::user()->id;
        $report->ref_id  = (int)$id;
        $report->save();

        dd($report);
    }
}
