<?php

namespace App\Http\Controllers\Admin;

use Validator;

use App\Bus;
use App\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class BusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $bus = Bus::with(['route', 'business', 'city'])->paginate(30);
        return response()->json($bus);
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
            'name' => 'required|unique:buses,name',
            'rpi_id' => 'required',
            'route_id' => 'required',
            'business_id' => 'required',
            'status' => 'required',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Save bus stop
        $bus = new Bus();
        $bus->name = $request->input('name');
        $bus->rpi_id = $request->input('rpi_id');
        $bus->route_id = $request->input('route_id');
        $bus->business_id = $request->input('business_id');
        $bus->status = $request->input('status');

        $route = Route::find($bus->route_id);
        $bus->city_id = $route->city_id;
        $bus->save();

        return response()->json(['success' => 'Автобус створено']);
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
            'name' => "unique:buses,name,$id",
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        $bus = Bus::find($id);
        if(empty($bus)){
            return response()->json(['error' => 'Автобус не знайдено']);
        }

        // Edit bus stop
        if($request->has('name')){
            $bus->name = $request->input('name');
        }
        if($request->has('rpi_id')){
            $bus->rpi_id = $request->input('rpi_id');
        }
        if($request->has('route_id')){
            $bus->route_id = $request->input('route_id');
        }
        if($request->has('business_id')){
            $bus->business_id = $request->input('business_id');
        }
        if($request->has('status')){
            $bus->status = $request->input('status');
        }
        if($request->has('priority')){
            $bus->priority = $request->input('priority');
        }
        if($request->has('priority_time')){
            $bus->priority_time = $request->input('priority_time');
        }
        $bus->save();

        return response()->json(['success' => 'Автобус змінено']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bus = Bus::find($id);
        if(empty($bus)){
            return response()->json(['error' => 'Автобус не знайдено']);
        }
        $bus->delete();

        return response()->json(['success' => 'Автобус видалено']);
    }
}
