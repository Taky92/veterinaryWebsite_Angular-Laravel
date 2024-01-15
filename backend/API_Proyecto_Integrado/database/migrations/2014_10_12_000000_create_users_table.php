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
        Schema::create('users', function (Blueprint $table) {
            $table->id('idUser');
            $table->string('name', 50);
            $table->string('surname', 100);
            $table->string('email')->unique();
            $table->string('phone', 9)->unique();
            $table->string('birthdate', 10);
            $table->string('photo', 100)->default('user.png');
            $table->boolean('active')->default(true);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 255);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
