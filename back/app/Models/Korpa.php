<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Korpa extends Model
{
    protected $table = 'korpe';
    use HasFactory;

    protected $fillable = ['korisnik_id', 'proizvod_id', 'kolicina'];

    public function korisnik() {
        return $this->belongsTo(User::class,'korisnik_id');
    }

    public function proizvod() {
        return $this->belongsTo(Proizvod::class);
    }
}
