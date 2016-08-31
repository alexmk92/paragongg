<?php

namespace App\Http\Traits;

use App\Setting;
use Illuminate\Http\Request;

use App\Http\Requests;

/**
 * Class UpdatesSettings
 * @package App\Http\Traits
 */
trait UpdatesSettings
{
    /**
     * @param $key
     * @param $value
     */
    public function updateSettings($key, $value)
    {
        $setting = Setting::where('key', $key)->first();
        if(!$setting) {
            $setting = new Setting();
            $setting->key = $key;
        }
        $setting->value = $value;
        $setting->save();
    }
}
