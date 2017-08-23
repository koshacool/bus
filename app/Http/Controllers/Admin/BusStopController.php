<?php

namespace App\Http\Controllers\Admin;

use Validator;

use App\BusStop;
use App\City;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class BusStopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bus_stops = BusStop::with('city')->paginate(30);
        return response()->json($bus_stops);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list_by_town($city_id)
    {
        $bus_stops = BusStop::with('city')->where('city_id', '=', $city_id)->get();
        return response()->json($bus_stops);
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
            'name' => 'required|unique:bus_stops,name',
            'points' => 'required|json',
            'city_id' => 'required',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Check City exist
        $city_exist = City::find($request->input('city_id'));
        if(empty($city_exist)){
            return response()->json(['error' => 'Міста не існує']);
        }

        // Save bus stop
        $bus_stop = new BusStop();
        $bus_stop->name = $request->input('name');
        $bus_stop->points = $request->input('points');
        $bus_stop->city_id = $request->input('city_id');
        $bus_stop->save();

        return response()->json(['success' => 'Зупинку створено']);
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
            'name' => "unique:bus_stops,name,$id",
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        $bus_stop = BusStop::find($id);
        if(empty($bus_stop)){
            return response()->json(['error' => 'Зупинку не знайдено']);
        }

        // Edit bus stop
        if($request->has('name')){
            $bus_stop->name = $request->input('name');
        }
        if($request->has('points')){
            $bus_stop->points = $request->input('points');
        }
        if($request->has('city_id')){
            // Check City exist
            $city_exist = City::find($request->input('city_id'));
            if(empty($city_exist)){
                return response()->json(['error' => 'Міста не існує']);
            }

            $bus_stop->city_id = $request->input('city_id');
        }
        $bus_stop->save();

        return response()->json(['success' => 'Зупинку змінено']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bus_stop = BusStop::find($id);
        if(empty($bus_stop)){
            return response()->json(['error' => 'Зупинку не знайдено']);
        }

        $bus_stop->delete();

        return response()->json(['success' => 'Зупинку видалено']);
    }
}
