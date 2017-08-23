<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DriverSchedule extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'bus_id', 'bus_schedule_id', 'day'
    ];

    /*==================================================*/
    /*==================== RELATIONSHIPS ===============*/
    /*==================================================*/

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function bus(){
        return $this->belongsTo('App\Bus');
    }

    public function bus_schedule(){
        return $this->belongsTo('App\BusSchedule');
    }
}
