<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Role;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Get all registered users
     *
     * @return json
     */
    public function getUsers()
    {
        $users = User::all();
        $users = $this->addRoleToUser($users);

        return response()->json($users);
    }

    /**
     * Get all available roles
     *
     * @return json
     */
    public function getRoles()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    /**
     * Add to each user in array his own role
     *
     * @param  array  $users
     *
     * @return array
     */
    private function addRoleToUser($users)
    {
        $newUsers = [];
        foreach ($users as $value) {
            $user = User::find($value->id);
            $role = $user->role()->get();
            $user->role = $role[0]->name;
            $newUsers[] = $user;
        }
        return $newUsers;
    }
}
