<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Porudzbina extends Model
{
    protected $table = 'porudzbine';
    use HasFactory;

    protected $fillable = ['korisnik_id', 'status','ukupna_cena'];

    public function stavkePorudzbine() {
        return $this->hasMany(StavkaPorudzbine::class);
    }

    public function korisnik() {
        return $this->belongsTo(User::class,'korisnik_id');
    }
}
