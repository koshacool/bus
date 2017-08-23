<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusSchedule extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'bus_id', 'business_id', 'route_id', 'schedule_data'
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

    public function route(){
        return $this->belongsTo('App\Route');
    }

    public function business(){
        return $this->belongsTo('App\Route');
    }

    public function bus(){
        return $this->belongsTo('App\Bus');
    }

    public function driver_schedule(){
        return $this->hasMany('App\DriverSchedule');
    }

}
