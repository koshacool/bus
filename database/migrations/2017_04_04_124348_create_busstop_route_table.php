<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusstopRouteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bus_stop_route', function (Blueprint $table) {
            $table->integer('bus_stop_id')->unsigned()->default('0');
            $table->integer('route_id')->unsigned()->default('0');
            $table->softDeletes();

            $table->foreign('bus_stop_id')->references('id')->on('bus_stops')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('route_id')->references('id')->on('routes')->onDelete('cascade')->onUpdate('cascade');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bus_stop_route');
    }
}
