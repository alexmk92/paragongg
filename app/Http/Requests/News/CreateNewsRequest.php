<?php

namespace App\Http\Requests\News;

use App\Http\Requests\Request;

class CreateNewsRequest extends Request
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
            'title'     => 'required|min:3',
            'slug'      => 'required|unique:news|min:3|alpha_dash',
            'type'      => 'required',
            'body'      => 'required|min:3',
        ];
    }
}