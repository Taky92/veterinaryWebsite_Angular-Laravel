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
        Schema::create('dates', function (Blueprint $table) {
            $table->id("idDate");
            $table->string('date', 10);
            $table->string('time', 5);
            $table->string('reason', 150);
            $table->boolean('active')->default(true);

            $table->BigInteger("idPet")->unsigned();
            $table->foreign("idPet")->references("idPet")->on("pets");

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
        Schema::dropIfExists('dates');
    }
};
