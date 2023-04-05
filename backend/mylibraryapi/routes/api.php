<?php

use App\Http\Controllers\GoogleApiController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BooksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class ,'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('users', UsersController::class);

Route::get('/googleapi', [GoogleApiController::class, 'getBooks']);

Route::get('books/{id}', [BooksController::class, 'index']);
Route::post('books/{id}', [BooksController::class, 'store']);
Route::delete('books/{user_id}/{book_id}', [BooksController::class, 'removeUser']);
Route::patch('books/updateReadCount', [BooksController::class, 'updateReadCount']);