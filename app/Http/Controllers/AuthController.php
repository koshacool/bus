<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{

    public function authenticate(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['status' => 'error', 'error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['status' => 'error', 'error' => 'could_not_create_token'], 500);
        }

        $authUser = JWTAuth::toUser($token);
        $role = $authUser->role()->get();

        // All good so return the token
        return response()->json([ 'status' => 'ok', 'token' => $token, 'role' => $role[0] ]);
    }

    public function refresh()
    {
        $token = JWTAuth::getToken();


        if (!$token) {
            return response()->json(['status' => 'error', 'error' => 'invalid_credentials'], 401);
        }

        try {
            $token = JWTAuth::refresh($token);
        } catch (TokenInvalidException $e) {
            return response()->json(['status' => 'error', 'error' => 'invalid_credentials'], 401);
        }

        $authUser = JWTAuth::toUser($token);
        $role = $authUser->role()->get();

        return response()->json([ 'status' => 'ok', 'token' => $token, 'role' => $role[0] ]);
    }

    public function profile()
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;

        $user = User::find($userId);
        $role = $user->role()->get();
        $user->role = $role[0]->name;

        return response()->json($user);
    }

    public function logout()
    {
        Auth::logout();
        return redirect('auth');
    }


}
