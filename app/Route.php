<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Route extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'length', 'points', 'city_id'
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

    public function bus_stop(){
        return $this->belongsToMany('App\BusStop');
    }

    public function bus(){
        return $this->hasMany('App\Bus');
    }

    public function city(){
        return $this->belongsTo('App\City');
    }

    public function bus_schedule(){
        return $this->hasMany('App\BusSchedule');
    }
}
