<?php

namespace App\Http\Controllers\Admin;

use Validator;
use Hash;

use App\User;
use App\Role;
use App\Business;
use App\DataOperator;
use App\DataOwner;
use App\DataDispatcher;
use App\DataDriver;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with(['role', 'data_operator', 'data_owner', 'data_dispatcher', 'data_driver'])->paginate(30);
        return response()->json($users);
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
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:6',
            'role_id' => 'required',
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Check role exist
        $role_exist = Role::find($request->role_id);
        if(empty($role_exist)){
            return response()->json(['error' => 'Роль не знайдено']);
        }

        // Save user
        $user = new User();
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->role_id = $request->input('role_id');
        $user->password = Hash::make($request->password);

        // User operator data
        if( ($request->has('data_operator_video_view_speed') || $request->has('data_operator_video_view_speed_turbo') || $request->has('data_operator_hot_keys')) && $request->input('role_id') == 2){
            // Validate data
            $validator = Validator::make($request->all(), [
                'data_operator_video_view_speed' => 'integer',
                'data_operator_video_view_speed_turbo' => 'integer',
                'data_operator_hot_keys' => 'json',
            ]);

            $data_operator = new DataOperator();
            if($request->has('data_operator_video_view_speed')){
                $data_operator->video_view_speed = $request->input('data_operator_video_view_speed');
            }
            if($request->has('data_operator_video_view_speed_turbo')){
                $data_operator->video_view_speed_turbo = $request->input('data_operator_video_view_speed_turbo');
            }
            if($request->has('data_operator_hot_keys')){
                $data_operator->hot_keys = $request->input('data_operator_hot_keys');
            }else{
                $data_operator->hot_keys = '{}';
            }
            $user->save();
            $user->data_operator()->save($data_operator);
        }

        // User owner data
        if( $request->has('data_owner_business_id') && $request->input('role_id') == 3 ){
            // Validate data
            $validator = Validator::make($request->all(), [
                'data_owner_bussines_id' => 'required',
            ]);

            // Check business exist
            $business_exist = Business::find($request->input('data_owner_business_id'));
            if(empty($business_exist)){
                return response()->json(['error' => 'Компанії не знайдено']);
            }

            $data_owner = new DataOwner();
            $data_owner->business_id = $request->input('data_owner_business_id');
            $user->save();
            $user->data_owner()->save($data_owner);
        }

        // User dispatcher data
        if( $request->has('data_dispatcher_business_id') && $request->input('role_id') == 4 ){
            // Validate data
            $validator = Validator::make($request->all(), [
                'data_dispatcher_bussines_id' => 'required',
            ]);

            // Check business exist
            $business_exist = Business::find($request->input('data_dispatcher_business_id'));
            if(empty($business_exist)){
                return response()->json(['error' => 'Компанії не знайдено']);
            }

            $data_dispatcher = new DataDispatcher();
            $data_dispatcher->business_id = $request->input('data_dispatcher_business_id');
            $user->save();
            $user->$data_dispatcher()->save($data_owner);
        }

        // User driver data
        if( $request->has('data_driver_business_id') && $request->input('role_id') == 5 ){
            // Validate data
            $validator = Validator::make($request->all(), [
                'data_driver_bussines_id' => 'required',
            ]);

            // Check business exist
            $business_exist = Business::find($request->input('data_driver_business_id'));
            if(empty($business_exist)){
                return response()->json(['error' => 'Компанії не знайдено']);
            }

            $data_driver = new DataDriver();
            $data_driver->business_id = $request->input('data_driver_business_id');
            $user->save();
            $user->$data_driver()->save($data_owner);
        }

        $user->save();
        return response()->json(['success' => 'Користувача створено']);
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
            'email' => "unique:users,email,$id",
        ]);

        if($validator->fails()){
            return response()->json(['error' => $validator->errors()]);
        }

        // Check user exist
        $user = User::find($id);
        if(empty($user)){
            return response()->json(['error' => 'Користувача не знайдено']);
        }

        // Check role exist
        if($request->has('role_id')){
            $role_exist = Role::find($request->role_id);
            if(empty($role_exist)){
                return response()->json(['error' => 'Роль не знайдено']);
            }
        }

        // Edit user
        if($request->has('name')){
            $user->name = $request->input('name');
        }
        if($request->has('email')){
            $user->email = $request->input('email');
        }
        if($request->has('role_id')){
            $user->role_id = $request->input('role_id');
        }
        if($request->has('password')){
            $user->password = Hash::make($request->input('password'));
        }
        $user->save();

        // User operator data
        if( ($request->has('data_operator_video_view_speed') || $request->has('data_operator_video_view_speed_turbo') || $request->has('data_operator_hot_keys')) && $user->role_id == 2){
            // Validate data
            $validator = Validator::make($request->all(), [
                'data_operator_video_view_speed' => 'integer',
                'data_operator_video_view_speed_turbo' => 'integer',
                'data_operator_hot_keys' => 'json',
            ]);

            $data_operator = DataOperator::where('user_id', '=', $user->id)->first() ?: new DataOperator();
            if($request->has('data_operator_video_view_speed')){
                $data_operator->video_view_speed = $request->input('data_operator_video_view_speed');
            }
            if($request->has('data_operator_video_view_speed_turbo')){
                $data_operator->video_view_speed_turbo = $request->input('data_operator_video_view_speed_turbo');
            }
            if($request->has('data_operator_hot_keys')){
                $data_operator->hot_keys = $request->input('data_operator_hot_keys');
            }

            $user->data_operator()->save($data_operator);
        }

        // User owner data
        if( $request->has('data_owner_business_id') && $user->role_id == 3 ){
            // Validate data
            $validator = Validator::make($request->all(), [
                'data_owner_business_id' => 'required',
            ]);

            // Check business exist
            $business_exist = Business::find($request->input('data_owner_business_id'));
            if(empty($business_exist)){
                return response()->json(['error' => 'Компанії не знайдено']);
            }

            $data_owner = DataOwner::where('user_id', '=', $user->id)->first() ?: new DataOwner();
            $data_owner->business_id = $request->input('data_owner_business_id');
            $user->data_owner()->save($data_owner);
        }

        // User dispatcher data
        if( $request->has('data_dispatcher_business_id') && $user->role_id == 4 ){
            // Validate data
            $validator = Validator::make($request->all(), [
                'data_dispatcher_business_id' => 'required',
            ]);

            // Check business exist
            $business_exist = Business::find($request->input('data_dispatcher_business_id'));
            if(empty($business_exist)){
                return response()->json(['error' => 'Компанії не знайдено']);
            }

            $data_dispatcher = DataDispatcher::where('user_id', '=', $user->id)->first() ?: new DataDispatcher();
            $data_dispatcher->business_id = $request->input('data_dispatcher_business_id');
            $user->data_owner()->save($data_dispatcher);
        }

        // User driver data
        if( $request->has('data_driver_business_id') && $user->role_id == 5 ){
            // Validate data
            $validator = Validator::make($request->all(), [
                'data_driver_business_id' => 'required',
            ]);

            // Check business exist
            $business_exist = Business::find($request->input('data_driver_business_id'));
            if(empty($business_exist)){
                return response()->json(['error' => 'Компанії не знайдено']);
            }

            $data_driver = DataDriver::where('user_id', '=', $user->id)->first() ?: new DataDriver();
            $data_driver->business_id = $request->input('data_driver_business_id');
            $user->data_owner()->save($data_driver);
        }

        return response()->json(['success' => 'Користувача змінено']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if(empty($user)){
            return response()->json(['error' => 'Користувача не знайдено']);
        }

        $user->data_operator()->delete();
        $user->data_owner()->delete();
        $user->delete();

        return response()->json(['success' => 'Користувача видалено']);
    }

    public function hot_keys_example(){
        $hot_keys = array(
            array(
                'name' => 'Нова подія',
                'key_num' => '1',
                'key_code' => '1',
            ),
            array(
                'name' => 'Нова подія2',
                'key_num' => '2',
                'key_code' => '2',
            ),
        );

        return response()->json($hot_keys);
    }

    /**
     * Get list of users based on role
     * 
     * @param int $roleId
     * @return \Illuminate\Http\Response
     */
    public function filterByRole($roleId)
    {
        $users = User::where('role_id', $roleId)->get();
        return response()->json($users);
    }
}
