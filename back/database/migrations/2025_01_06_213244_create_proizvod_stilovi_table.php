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
        Schema::create('proizvod_stilovi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proizvod_id')->constrained('proizvodi')->onDelete('cascade');
            $table->foreignId('stil_id')->constrained('stilovi')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proizvod_stilovi');
    }
};
