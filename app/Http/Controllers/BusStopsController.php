<?php

namespace App\Http\Controllers;

use Auth;
use App\BusStop;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class BusStopsController extends Controller
{

    /**
     * Create a new bus stops after check user auth and user roles
     *
     * @param  Request $request
     * @return \App\Stop
     */
    public function create(Request $request)
    {
        $authUser = JWTAuth::parseToken()->authenticate();

        if (!$this->isAdmin($authUser)) {
            return response()->json(['status' => 'ok', 'error' => 'You don\'t have permission!']);
        }


        return BusStop::create([
            'name' => $request->name,
            'address' => $request->address,
            'location' => $request->location,
            'city_id' => 1,
        ]);
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



}
