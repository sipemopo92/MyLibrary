<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;


    protected $fillable = [
        'google_id',
        'title',
        'authors',
        'isbn',
        'description',
        'thumbnail'
    ];


    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}