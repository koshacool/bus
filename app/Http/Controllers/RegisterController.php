<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class RegisterController extends Controller
{

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  Request  $request
     * @return \App\User
     */
    public function create(Request $request)
    {
       return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->roleId,
            'password' => bcrypt($request->password),
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  Request  $request
     * @return \App\User
     */
    public function remove(Request $request)
    {
        $id = $request->id;
        $userId = JWTAuth::parseToken()->authenticate()->id;

        if ($userId == $id) {
            return response()->json(['status' => 'ok', 'error' => 'You cannot remove yourself!']);
        }

        $user= User::find($id);
        $user->delete();

        return response()->json(['status' => 'ok', 'statusText' => 'revomed']);
    }


}
