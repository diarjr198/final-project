<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'user' => $user,
            'stats' => $this->stats($user->id),
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user();
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'username' => ['sometimes', 'required', 'string', 'max:50', 'alpha_dash', Rule::unique('users')->ignore($user->id)],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'avatar' => ['nullable', 'string', 'max:2048'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $user->update(array_filter($data, fn ($value) => $value !== null && $value !== ''));

        return response()->json([
            'user' => $user->refresh(),
            'stats' => $this->stats($user->id),
        ]);
    }

    private function stats(int $userId): array
    {
        $base = GameSession::where('user_id', $userId);
        $totalScore = (clone $base)->sum('score');
        $bestScore = (clone $base)->max('score') ?? 0;
        $rank = GameSession::selectRaw('user_id, MAX(score) as best_score')
            ->groupBy('user_id')
            ->orderByDesc('best_score')
            ->pluck('user_id')
            ->search($userId);

        return [
            'total_games' => (clone $base)->count(),
            'total_score' => $totalScore,
            'best_score' => $bestScore,
            'rank' => $rank === false ? null : $rank + 1,
        ];
    }
}
