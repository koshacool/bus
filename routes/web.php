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
//Auth::routes();

//Logout user
Route::get('/logout', "AuthController@logout");

//Authenticate user
Route::post('/auth', "AuthController@authenticate");

//Show form for authenticate user
Route::get('/auth', function () {
    return view('index');
});
//Route::get('/auth/refresh',"AuthController@refresh");
//Route::get('/auth/profile',"AuthController@profile");

//For all url show SPA
Route::any('{all}', function () {
    return view('index');
})  -> where('all', '.*')
    -> middleware('auth');

//
//Route::get('/admin', function () {
//    return view('index');
//})->middleware('auth');
//
//
//Route::get('/home', 'HomeController@index')->name('home');
