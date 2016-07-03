<?php

namespace App\Http\Traits;

use App\Shortcode;
use Illuminate\Http\Request;

use App\Http\Requests;

trait GeneratesShortcodes
{
    public function generate($url, $type, $id)
    {
        $uniqid = base_convert(microtime(false), 10, 36);

        while(Shortcode::where('code', $uniqid)->first()) {
            $uniqid = base_convert(microtime(false), 10, 36);
        }

        $shortcode = new Shortcode();
        $shortcode->resource_id   = $id;
        $shortcode->resource_type = $type;
        $shortcode->url           = $url;
        $shortcode->code          = $uniqid;
        $shortcode->save();

        return $shortcode->code;
    }
}
