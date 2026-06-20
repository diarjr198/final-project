<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('level', ['easy', 'medium', 'hard']);
            $table->unsignedInteger('score')->default(0);
            $table->decimal('accuracy', 5, 2)->default(0);
            $table->unsignedInteger('duration')->default(0);
            $table->unsignedInteger('correct_words')->default(0);
            $table->unsignedInteger('wrong_words')->default(0);
            $table->unsignedInteger('wpm')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_sessions');
    }
};
