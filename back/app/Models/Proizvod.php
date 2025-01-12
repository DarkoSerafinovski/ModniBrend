<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proizvod extends Model
{
    protected $table = 'proizvodi';
    use HasFactory;

    protected $fillable = ['naziv', 'opis', 'cena', 'putanja_slike', 'kategorija_id'];

    public function stilovi() {
        return $this->belongsToMany(Stil::class, 'proizvod_stilovi');
    }

    public function kategorija() {
        return $this->belongsTo(Kategorija::class);
    }
}
