<?php

namespace App\Http\Controllers;

use App\Report;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

/**
 * Class ReportController
 * @package App\Http\Controllers
 */
class ReportController extends Controller
{
    /**
     * @param $id
     * @return mixed
     */
    public function store($id)
    {
        if(!Auth::check()) abort(403);
        $exists = Report::where('user_id', Auth::user()->id)->where('ref_id', (int)$id)->first();
        if($exists) {
            session()->flash('notification', 'warning|You have already reported this.');
            return redirect()->back();
        } else {
            $report = new Report();
            $report->user_id = Auth::user()->id;
            $report->ref_id  = (int)$id;
            $report->save();

            session()->flash('notification', 'info|Your report has been logged.');
            return redirect()->back();
        }
    }
}
