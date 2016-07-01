<?php

namespace App\Http\Requests\Account;

use App\Http\Requests\Request;
use Illuminate\Support\Facades\Auth;

class UpdateProfileRequest extends Request
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
            'avatar'    => 'image|mimes:jpeg,png|max:500',
            'username'  => 'required|max:20|unique:users,username,'.Auth::user()->id,
            'email'     => 'required|email|max:255|unique:users,email,'.Auth::user()->id,
            'name'      => 'min:3',
            'twitch_tv' => 'min:3',
            'twitter'   => 'min:2',
            'website'   => 'url',
            'bio'       => 'min:10'
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'website.url' => 'The website format is invalid. Try prefixing it with http://',
            //'body.required'  => 'A message is required',
        ];
    }
}
