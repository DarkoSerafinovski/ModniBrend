<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Clanak extends Model
{
    protected $table = 'clanci';
    use HasFactory;

    protected $fillable = ['korisnik_id', 'naslov', 'sadrzaj','slika'];

    public function korisnik() {
        return $this->belongsTo(User::class,'korisnik_id');
    }
}
