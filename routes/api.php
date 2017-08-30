<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Check authrization user for all these queryes
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('get/user', 'AuthController@getAuthUser');
    Route::get('get/users', 'AdminController@getUsers');
});



















Route::get('user/profile', 'AuthController@profile');



// Admin area
// Route::group(['prefix' => 'admin', 'middleware' => 'admin'], function () {
Route::group(['prefix' => 'admin'], function () {

    // User
    Route::resource('user', 'Admin\UserController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);
    Route::get('/user/hot_keys_example', 'Admin\UserController@hot_keys_example');
    Route::get('user/filter/role/{role_id}', 'Admin\UserController@filterByRole');

    // BusStop
    Route::resource('busstop', 'Admin\BusStopController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);
    Route::get('/busstop/list_by_city/{city_id}', 'Admin\BusStopController@list_by_town');

    // Route
    Route::resource('route', 'Admin\RouteController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);
    Route::get('/route/list_by_city/{cityId}', 'Admin\RouteController@listByCity');

    // Bus
    Route::resource('bus', 'Admin\BusController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);

    // Role
    Route::resource('role', 'Admin\RoleController', ['only' => [
        'index',
    ]]);

    // City
    Route::resource('city', 'Admin\CityController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);

    // Business
    Route::resource('business', 'Admin\BusinessController', ['only' => [
        'index', 'store', 'update', 'destroy'
    ]]);
});
