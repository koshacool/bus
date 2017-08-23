<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class City extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'center_point'
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

    public function business(){
        return $this->hasMany('App\Business');
    }

    public function route(){
        return $this->hasMany('App\Route');
    }

    public function bus_stop(){
        return $this->hasMany('App\BusStop');
    }

    public function bus(){
        return $this->hasMany('App\Bus');
    }
}
