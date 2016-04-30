<?php

namespace App\Http\Requests\Account;

use Illuminate\Contracts\Validation\Factory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Request;

class UpdatePasswordRequest extends Request
{
    /**
     * Create a new FormRequest instance.
     *
     * @param Factory $factory
     */
    public function __construct(Factory $factory)
    {
        $factory->extend(
            'old_password',
            function ($attribute, $value)
            {
                if(Hash::check($value, Auth::user()->password)) {
                    return true;
                }

                return false;
            }
        );
    }

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
            'old_password'              => 'required|min:3|old_password',
            'new_password'              => 'required|min:6|confirmed',
            'new_password_confirmation' => 'required|min:6'
        ];
    }

    public function messages()
    {
        return [
            'old_password.old_password'          => 'The current password you have entered was incorrect.',
            'old_password.required'              => 'You must enter your current password.',
            'new_password.required'              => 'You must enter your new password.',
            'new_password_confirmation.required' => 'You must confirm your new password.',
        ];
    }
}
