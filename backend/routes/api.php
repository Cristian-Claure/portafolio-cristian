<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    DB::select('SELECT 1');

    return response()->json([
        'success' => true,
        'status' => 'ok',
        'application' => config('app.name'),
        'database' => config('database.default'),
        'message' => 'Frontend, backend y PostgreSQL disponibles.',
        'timestamp' => now()->toIso8601String(),
    ]);
});
