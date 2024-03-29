<?php

namespace App\Http\Controllers\API;

use App\Report;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

/**
 * Class ReportController
 * @package App\Http\Controllers\API
 */
class ReportController extends Controller
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function store(Request $request)
    {
        if(!Auth::check()) return response()->json(['code' => 403, 'message' => 'You must be logged in to report a comment']);
        $exists = Report::where('user_id', Auth::user()->id)->where('ref_id', (int) $request->ref_id)->first();
        if($exists) {
            return response()->json(['code' => 403, 'message' => 'This account has already reported this ref', 'ref_id' => $request->ref_id]);
        } else {
            $report = new Report();
            $report->user_id = Auth::user()->id;
            $report->ref_id  = (int) $request->ref_id;
            $report->save();

            return response()->json(['code' => 200, 'message' => 'Report logged', 'ref_id' => $request->ref_id]);
        }
    }
}
