<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GameSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GameSessionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = GameSession::with('user:id,name,username')
            ->when($request->user()->role !== 'admin', fn ($query) => $query->where('user_id', $request->user()->id))
            ->when($request->search, fn ($query, $search) => $query->where('level', 'like', "%{$search}%"))
            ->when($request->from, fn ($query, $from) => $query->whereDate('created_at', '>=', $from))
            ->when($request->to, fn ($query, $to) => $query->whereDate('created_at', '<=', $to));

        $sort = $request->boolean('score_desc') ? 'desc' : 'asc';
        $sessions = $query->orderBy('score', $sort)->latest()->paginate($request->integer('per_page', 10));

        return response()->json($sessions);
    }

    public function store(Request $request): JsonResponse
    {
        $session = $request->user()->gameSessions()->create($this->validated($request));

        return response()->json($session->load('user:id,name,username'), 201);
    }

    public function show(Request $request, GameSession $gameSession): JsonResponse
    {
        $this->authorizeSession($request, $gameSession);

        return response()->json([
            'session' => $gameSession->load('user:id,name,username'),
            'previous_scores' => GameSession::where('user_id', $gameSession->user_id)
                ->where('id', '!=', $gameSession->id)
                ->latest()
                ->limit(10)
                ->get(['id', 'score', 'accuracy', 'wpm', 'created_at']),
        ]);
    }

    public function update(Request $request, GameSession $gameSession): JsonResponse
    {
        $this->authorizeSession($request, $gameSession);
        $gameSession->update($this->validated($request));

        return response()->json($gameSession->refresh()->load('user:id,name,username'));
    }

    public function destroy(Request $request, GameSession $gameSession): JsonResponse
    {
        $this->authorizeSession($request, $gameSession);
        $gameSession->delete();

        return response()->json(['message' => 'Data permainan dihapus.']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'level' => ['required', 'in:easy,medium,hard'],
            'score' => ['required', 'integer', 'min:0'],
            'accuracy' => ['required', 'numeric', 'min:0', 'max:100'],
            'duration' => ['required', 'integer', 'min:1'],
            'correct_words' => ['required', 'integer', 'min:0'],
            'wrong_words' => ['required', 'integer', 'min:0'],
            'wpm' => ['required', 'integer', 'min:0'],
        ]);
    }

    private function authorizeSession(Request $request, GameSession $gameSession): void
    {
        abort_if($request->user()->role !== 'admin' && $gameSession->user_id !== $request->user()->id, 403);
    }
}
