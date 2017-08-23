<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use App\User;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userId = JWTAuth::parseToken()->authenticate()->id;
        $user = User::find($userId);

        if ($user->role->name !== 'admin') {
            return response()->json(['error' => 'Ви не маєте прав на перегляд даної сторінки']);;
        }

        return $next($request);
    }
}
