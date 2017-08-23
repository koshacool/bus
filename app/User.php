<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
    */
    protected $dates = ['deleted_at'];


    /*==================================================*/
    /*==================== RELATIONSHIPS ===============*/
    /*==================================================*/

    public function role(){
        return $this->belongsTo('App\Role');
    }

    public function operator_processing(){
        return $this->hasMany('App\OperatorProcessing');
    }

    public function data_operator(){
        return $this->hasOne('App\DataOperator');
    }

    public function data_owner(){
        return $this->hasOne('App\DataOwner');
    }

    public function data_dispatcher(){
        return $this->hasOne('App\DataDispatcher');
    }

    public function data_driver(){
        return $this->hasOne('App\DataDriver');
    }

    public function driver_schedule(){
        return $this->hasMany('App\DriverSchedule');
    }
}
