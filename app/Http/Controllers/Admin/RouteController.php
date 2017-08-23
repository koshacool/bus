<?php

namespace App\Http\Controllers\Admin;

use Validator;

use App\Route;
use App\City;
use App\BusStop;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class RouteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $route = Route::with('bus_stop')->paginate(50);
        return response()->json($route);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate data
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:routes,name',
            'city_id' => 'required',
            'points' => 'required|json',
            'length' => 'required',
            'bus_stop' => 'required|json',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Check City exist
        $city_exist = City::find($request->input('city_id'));
        if(empty($city_exist)){
            return response()->json(['error' => 'Міста не існує']);
        }

        // Check Busstop exist
        $bus_stop = json_decode($request->input('bus_stop'));
        foreach ($bus_stop as $bus_stop_item) {
            $bus_stop_exist = BusStop::find($bus_stop_item);
            if(empty($bus_stop_exist)){
                return response()->json(['error' => 'Зупинки не існує']);
            }
        }

        // Save bus stop
        $route = new Route();
        $route->name = $request->input('name');
        $route->points = $request->input('points');
        $route->length = $request->input('length');
        $route->city_id = $request->input('city_id');
        $route->save();
        $route->bus_stop()->attach($bus_stop);
        $route->save();

        return response()->json(['success' => 'Маршрут створено']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validate data
        $validator = Validator::make($request->all(), [
            'name' => "unique:routes,name,$id",
            'points' => 'json',
            'bus_stop' => 'json',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Check Route exist
        $route = Route::find($id);
        if(empty($route)){
            return response()->json(['error' => 'Маршрут не знайдено']);
        }

        // Edit bus stop
        if($request->has('name')){
            $route->name = $request->input('name');
        }
        if($request->has('points')){
            $route->points = $request->input('points');
        }
        if($request->has('length')){
            $route->length = $request->input('length');
        }
        if($request->has('city_id')){
            // Check City exist
            $city_exist = City::find($request->input('city_id'));
            if(empty($city_exist)){
                return response()->json(['error' => 'Міста не існує']);
            }

            $route->city_id = $request->input('city_id');
        }
        if($request->has('bus_stop')){
            // Check Busstop exist
            $bus_stop = json_decode($request->input('bus_stop'));
            foreach ($bus_stop as $bus_stop_item) {
                $bus_stop_exist = BusStop::find($bus_stop_item);
                if(empty($bus_stop_exist)){
                    return response()->json(['error' => 'Зупинки не існує']);
                }
            }

            $route->bus_stop()->detach();
            $route->bus_stop()->attach($bus_stop);
        }
        $route->save();

        return response()->json(['success' => 'Маршрут змінено']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $route = Route::find($id);
        if(empty($route)){
            return response()->json(['error' => 'Маршрут не знайдено']);
        }

        $route->bus_stop()->detach();
        $route->delete();

        return response()->json(['success' => 'Маршрут видалено']);
    }

    public function listByCity($cityId)
    {
        $routes = Route::where('city_id', '=', $cityId)->get();
        return response()->json($routes);
    }
}
