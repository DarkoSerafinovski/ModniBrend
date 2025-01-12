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
        Schema::create('korpe', function (Blueprint $table) {
            $table->id();
            $table->foreignId('korisnik_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('proizvod_id')->constrained('proizvodi')->onDelete('cascade');
            $table->integer('kolicina')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('korpe');
    }
};
