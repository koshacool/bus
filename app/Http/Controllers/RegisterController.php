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
     * @param  Request $request
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
     * @param  Request $request
     * @return \App\User
     */
    public function remove(Request $request)
    {
        $id = $request->id;
        $authUser = JWTAuth::parseToken()->authenticate();


        if ($authUser->id == $id) {
            return response()->json(['status' => 'ok', 'error' => 'You cannot remove yourself!']);
        }

        if (!$this->isAdmin($authUser)) {
            return response()->json(['status' => 'ok', 'error' => 'You don\'t have permission!']);
        }

        $user = User::find($id);
        $user->delete();

        return response()->json(['status' => 'ok', 'statusText' => 'revomed']);
    }

    /**
     * Check user for admin role
     *
     * @param  User $user
     * @return bool
     */
    public function isAdmin($user)
    {
        $role = $user->role()->get();

        if ($role[0]->name == 'admin') {
            return true;
        }

        return false;
    }

    /**
     * Update  user info after valid registration.
     *
     * @param  Request $request
     * @return \App\User
     */
    public function update(Request $request)
    {
        $id = $request->id;
        $authUser = JWTAuth::parseToken()->authenticate();

        if (!$this->isAdmin($authUser)) {
            return response()->json(['status' => 'ok', 'error' => 'You don\'t have permission!']);
        }

        $user = User::find($id);
        $user->forceFill([
            'password' => bcrypt($request->password),
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->roleId,
        ])->save();

        return response()->json(['status' => 'ok', 'statusText' => 'saved']);
    }


}
