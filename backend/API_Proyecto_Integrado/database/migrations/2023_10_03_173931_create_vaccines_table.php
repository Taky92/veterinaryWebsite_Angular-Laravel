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
        Schema::create('vaccines', function (Blueprint $table) {
            $table->id("idVaccine");
            $table->string('name', 100);
            $table->string('date', 10);
            $table->string('expiration', 10);
            $table->boolean('active')->default(true);

            $table->BigInteger("idPet")->unsigned();
            $table->foreign("idPet")->references("idPet")->on("pets")->onDelete("cascade")->onUpdate("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vaccines');
    }
};
