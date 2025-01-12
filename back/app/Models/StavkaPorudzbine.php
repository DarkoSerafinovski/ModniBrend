<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StavkaPorudzbine extends Model
{
    protected $table = 'stavke_porudzbine';
    use HasFactory;

    protected $fillable = ['porudzbina_id', 'proizvod_id', 'kolicina', 'cena'];

    public function porudzbina() {
        return $this->belongsTo(Porudzbina::class);
    }

    public function proizvod() {
        return $this->belongsTo(Proizvod::class);
    }
}
