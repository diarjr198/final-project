<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameSession;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class LeaderboardController extends Controller
{
    public function index(): JsonResponse
    {
        $leaders = GameSession::query()
            ->selectRaw('user_id, MAX(score) as best_score, COUNT(*) as total_games, SUM(score) as total_score')
            ->with('user:id,name,username,avatar')
            ->groupBy('user_id')
            ->orderByDesc('best_score')
            ->limit(20)
            ->get()
            ->values()
            ->map(fn ($row, $index) => [
                'rank' => $index + 1,
                'user' => $row->user,
                'best_score' => (int) $row->best_score,
                'total_score' => (int) $row->total_score,
                'total_games' => (int) $row->total_games,
            ]);

        return response()->json([
            'players' => User::count(),
            'total_games' => GameSession::count(),
            'top_score' => GameSession::max('score') ?? 0,
            'leaderboard' => $leaders,
        ]);
    }
}
