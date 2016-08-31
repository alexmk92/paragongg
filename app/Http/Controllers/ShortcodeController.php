<?php

namespace App\Http\Controllers;

use App\Shortcode;
use Illuminate\Http\Request;

use App\Http\Requests;

/**
 * Class ShortcodeController
 * @package App\Http\Controllers
 */
class ShortcodeController extends Controller
{
    /**
     * @param $code
     * @return mixed
     */
    public function redirect($code)
    {
        $shortcode = Shortcode::where('code', $code)->firstOrFail();

        return redirect($shortcode->url);
    }
}
