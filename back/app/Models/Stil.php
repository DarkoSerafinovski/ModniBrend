<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stil extends Model
{
    protected $table = 'stilovi';
    use HasFactory;

    protected $fillable = ['naziv'];

    

    public function proizvodi() {
        return $this->belongsToMany(Proizvod::class, 'proizvod_stilovi');
    }


 
}
