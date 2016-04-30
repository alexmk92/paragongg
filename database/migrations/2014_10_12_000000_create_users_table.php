<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('role');
            $table->integer('amber')->default(50);
            $table->string('name')->nullable();
            $table->string('username');
            $table->string('ign_epic')->nullable();
            $table->string('ign_psn')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            $table->string('bio', 300)->nullable();
            $table->string('website')->nullable();
            $table->string('twitter')->nullable();
            $table->string('twitch_tv')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
