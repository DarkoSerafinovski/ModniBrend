<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategorija extends Model
{
    protected $table = 'kategorije';
    use HasFactory;

    protected $fillable = ['naziv','slika'];

    public function proizvodi() {
        return $this->hasMany(Proizvod::class);
    }
}
