<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'level', 'score', 'accuracy', 'duration', 'correct_words', 'wrong_words', 'wpm'])]
class GameSession extends Model
{
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function casts(): array
    {
        return [
            'accuracy' => 'decimal:2',
            'score' => 'integer',
            'duration' => 'integer',
            'correct_words' => 'integer',
            'wrong_words' => 'integer',
            'wpm' => 'integer',
        ];
    }
}
