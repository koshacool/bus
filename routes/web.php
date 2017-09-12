<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/




Route::middleware(['cors'])->group(function () {
    //Show form for authorization
//    Route::get('/sign-in', function () {
//        return view('index');
//    });

//Authorizate user
    Route::post('/sign-in', "AuthController@authenticate");
    Route::post('/refresh', "AuthController@refresh");

    //Show SPA

    Route::get('/', function () {
        return view('index');
    });

    Route::any('/{all}', function () {
        return view('index');
    });

    Route::get('/operator/{all}', function () {
        return view('index');
    });


});
