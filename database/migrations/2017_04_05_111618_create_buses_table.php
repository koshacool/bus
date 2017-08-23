<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('buses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->default('');
            $table->string('rpi_id')->default('');
            $table->integer('route_id')->unsigned();
            $table->integer('business_id')->unsigned();
            $table->integer('city_id')->unsigned();
            $table->integer('status')->unsigned()->default(0);
            $table->integer('priority')->unsigned()->default(0);
            $table->datetime('priority_time')->default('1970-01-01 00:00:00');
            $table->timestamps();

            $table->foreign('route_id')->references('id')->on('routes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('business_id')->references('id')->on('businesses')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('city_id')->references('id')->on('cities')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('buses');
    }
}
