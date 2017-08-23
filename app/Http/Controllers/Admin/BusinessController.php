<?php

namespace App\Http\Controllers\Admin;

use Validator;
use App\Business;
use App\City;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class BusinessController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $business = Business::with('city')->paginate(30);
        return response()->json($business);
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
            'name' => 'required|unique:businesses,name',
            'city_id' => 'required',
            'base_points' => 'required|json',
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
        $business = new Business();
        $business->name = $request->input('name');
        $business->city_id = $request->input('city_id');
        $business->base_points = $request->input('base_points');
        $business->save();

        return response()->json(['success' => 'Компанію створено']);
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
            'name' => "unique:businesses,name,$id",
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Save bus stop
        $business = Business::find($id);
        if($request->has('name')){
            $business->name = $request->input('name');
        }
        if($request->has('city_id')){
            // Check City exist
            $city_exist = City::find($request->input('city_id'));
            if(empty($city_exist)){
                return response()->json(['error' => 'Міста не існує']);
            }

            $business->city_id = $request->input('city_id');
        }
        if($request->has('base_points')){
            $business->base_points = $request->input('base_points');
        }
        $business->save();

        return response()->json(['success' => 'Компанію змінено']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $business = Business::find($id);
        if(empty($business)){
            return response()->json(['error' => 'Компанію не знайдено']);
        }

        $business->delete();

        return response()->json(['success' => 'Компанію видалено']);
    }


    public function listByCity($cityId)
    {
        $businesses = Business::where('city_id', '=', $cityId)->get();
        return response()->json($businesses);
    }
}
