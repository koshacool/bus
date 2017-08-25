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



Route::post('/auth',"AuthController@authenticate");
Route::get('/auth/refresh',"AuthController@refresh");
Route::get('/auth/profile',"AuthController@profile");

Route::get('/', function () {
    return view('index');
}) -> where('path', '.+');
