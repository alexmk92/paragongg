<?php

namespace App\Http\Controllers;

use App\Shortcode;
use Illuminate\Http\Request;

use App\Http\Requests;

class ShortcodeController extends Controller
{
    public function redirect($code)
    {
        $shortcode = Shortcode::where('code', $code)->firstOrFail();

        return redirect($shortcode->url);
    }
}
