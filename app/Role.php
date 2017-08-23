<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'permissions',
    ];

    /*==================================================*/
    /*==================== RELATIONSHIPS ===============*/
    /*==================================================*/

    public function user(){
        return $this->hasMany('App\User');
    }
}
