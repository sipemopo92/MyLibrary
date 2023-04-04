<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GoogleApiController extends Controller
{
    public function getBooks(Request $request)
    {
        $res = [
            'data' => [],
            'success' => true,
            'message' => ''
        ];
        try {
            $title = $request->input('title');
            $titleFormatted = str_replace(' ', '+', $title);
            $response = Http::get("https://www.googleapis.com/books/v1/volumes?q=$titleFormatted");

            foreach ($response['items'] as $item) {
                $book = [
                    'google_id' => $item['id'],
                    'title' => $item['volumeInfo']['title'],
                    'authors' => '',
                    'description' => '',
                    'isbn' => '',
                    'thumbnail' => ''
                ];
                if (array_key_exists('authors', $item['volumeInfo'])) {
                    $book['authors'] = implode(', ', $item['volumeInfo']['authors']);
                }
                if (array_key_exists('description', $item['volumeInfo'])) {
                    $book['description'] = $item['volumeInfo']['description'];
                }
                if (array_key_exists('industryIdentifiers', $item['volumeInfo'])) {
                    foreach ($item['volumeInfo']['industryIdentifiers'] as $code) {
                        if ($code['type'] == 'ISBN_13') {
                            $book['isbn'] = $code['identifier'];
                        }
                    }
                }
                if (array_key_exists('imageLinks', $item['volumeInfo'])) {
                    if (array_key_exists('thumbnail', $item['volumeInfo']['imageLinks'])) {
                        // $parsedUrl = parse_url($item['volumeInfo']['imageLinks']['thumbnail']);
                        // parse_str($parsedUrl['query'], $queryParams);
                        // $queryParams['zoom'] = '2';
                        // $queryString = http_build_query($queryParams);
                        // $newUrl = $parsedUrl['path'] . '?' . $queryString;
                        // $book['thumbnail'] = $parsedUrl['scheme'] . '://' . $parsedUrl['host'] . $parsedUrl['path'] . '?' . $queryString;
                        $book['thumbnail'] = $item['volumeInfo']['imageLinks']['thumbnail'];
                    }
                }
                array_push($res['data'], $book);
            }


        } catch (\Exception $e) {
            $res['success'] = false;
            $res['message'] = $e->getMessage();
        }
        return $res;
    }
}