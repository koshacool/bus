<?php

namespace App\Http\Controllers\Admin;

use Validator;
use App\City;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cities = City::all();
        return response()->json($cities);
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
            'name' => 'required|unique:cities,name',
            'center_point' => 'required|json',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Save bus stop
        $city = new City();
        $city->name = $request->input('name');
        $city->center_point = $request->input('center_point');
        $city->save();

        return response()->json(['success' => 'Місто створено']);


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
            'name' => "unique:cities,name,$id",
            'center_point' => 'json',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Save bus stop
        $city = City::find($id);
        if($request->has('name')){
            $city->name = $request->input('name');
        }
        if($request->has('center_point')){
            $city->center_point = $request->input('center_point');
        }
        $city->save();

        return response()->json(['success' => 'Місто змінено']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $city = City::find($id);
        if(empty($city)){
            return response()->json(['error' => 'Місто не знайдено']);
        }

        $city->delete();

        return response()->json(['success' => 'Місто видалено']);
    }
}
