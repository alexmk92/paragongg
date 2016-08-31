<?php

namespace App\Http\Traits;

use App\Shortcode;
use Illuminate\Http\Request;

use App\Http\Requests;

/**
 * Class GeneratesShortcodes
 * @package App\Http\Traits
 */
trait GeneratesShortcodes
{
    /**
     * @param $url
     * @param $type
     * @param $id
     * @return string
     */
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
