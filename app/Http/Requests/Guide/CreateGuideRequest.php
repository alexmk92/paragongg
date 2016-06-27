<?php

namespace App\Http\Requests\Guide;

use App\Http\Requests\Request;

class CreateGuideRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'hero'      => 'required',
            'title'     => 'required|min:3',
            'type'      => 'required',
            'body'      => 'required|min:3',

            'deck'      => 'min:6',
            'ability-1' => 'numeric',
            'ability-2' => 'numeric',
            'ability-3' => 'numeric',
            'ability-4' => 'numeric',
            'ability-5' => 'numeric',
            'ability-6' => 'numeric',
            'ability-7' => 'numeric',
            'ability-8' => 'numeric',
            'ability-9' => 'numeric',
            'ability-10' => 'numeric',
            'ability-11' => 'numeric',
            'ability-12' => 'numeric',
            'ability-13' => 'numeric',
            'ability-14' => 'numeric',
            'ability-15' => 'numeric',
        ];
    }
}
