<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    public function index($user_id)
    {
        $res = [
            'data' => '',
            'success' => true,
            'message' => ''
        ];
        try {
            $user = User::find($user_id);
            $books = $user->books()->get();
            $books = $user->books()
                ->withPivot('id', 'read_count', 'added_at', 'deleted_at')
                ->wherePivot('deleted_at', null)
                ->get();
            $res['data'] = $books;
        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }


    public function store($user_id, Request $request)
    {
        $res = [
            'data' => '',
            'success' => true,
            'message' => ''
        ];
        try {
            $user = User::findOrFail($user_id);
            $book = Book::firstOrCreate(
                [
                    'google_id' => $request->google_id,
                    'title' => $request->title,
                    'authors' => $request->authors,
                    'description' => $request->description,
                    'isbn' => $request->isbn,
                    'thumbnail' => $request->thumbnail,
                ]
            );
            if (!$user->books()->where('books.id', $book->id)->exists()) {
                $user->books()->attach($book);
                $user->books()->updateExistingPivot($book->id, ['added_at' => now()]);
            }
            $res['data'] = $book;
        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }


    public function removeUser($user_id, $book_id) {
        $res = [
            'data' => '',
            'success' => true,
            'message' => ''
        ];
        try {
            $book = Book::find($book_id);
            if ($book) {
                $book->users()->detach($user_id);
                $res['data'] = $book;
            }
        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }

}
