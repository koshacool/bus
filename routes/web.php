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

//Show form for authorization
Route::get('auth', function () {
    return view('index');});

//Authorizate user
Route::post('auth', "AuthController@authenticate");



//Check authrization user for all these queryes
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('get/users', 'AdminController@getUsers');
});


//Show SPA
Route::any('{all}', function () {
    return view('index');
});
