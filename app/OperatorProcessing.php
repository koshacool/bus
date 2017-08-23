<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OperatorProcessing extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'entity_type', 'entity_id'
    ];

    /*==================================================*/
    /*==================== RELATIONSHIPS ===============*/
    /*==================================================*/

    public function user(){
        return $this->belongsTo('App\User');
    }
}
