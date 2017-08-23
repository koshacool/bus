<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'rpi_id', 'route_id', 'business_id', 'city_id', 'status', 'priority', 'priority_time'
    ];

    /*==================================================*/
    /*==================== RELATIONSHIPS ===============*/
    /*==================================================*/

    public function route(){
        return $this->belongsTo('App\Route');
    }

    public function business(){
        return $this->belongsTo('App\Business');
    }

    public function city(){
        return $this->belongsTo('App\City');
    }

    public function bus_schedule(){
        return $this->hasMany('App\BusSchedule');
    }

    public function driver_schedule(){
        return $this->hasMany('App\DriverSchedule');
    }
}
