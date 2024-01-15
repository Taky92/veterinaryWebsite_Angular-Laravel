<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id("idPet");
            $table->string('name', 50);
            $table->enum("species", ["dog", "cat"])->default("dog");
            $table->enum('gender', ["male", "female"]);
            $table->string("birthdate", 10);
            $table->string("photo", 100)->default("pet.png");
            $table->boolean('active')->default(true);

            $table->BigInteger("idUser")->unsigned();
            $table->foreign("idUser")->references("idUser")->on("users")->onDelete("cascade")->onUpdate("cascade");

            $table->BigInteger("idVeterinary")->unsigned();
            $table->foreign("idVeterinary")->references("idVeterinary")->on("veterinaries")->onDelete("cascade")->onUpdate("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
