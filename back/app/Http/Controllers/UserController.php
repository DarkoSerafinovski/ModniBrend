<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function mojePreporuke(Request $request)
    {
        
        $user = Auth::user();
        $stilovi = $user->stilovi;
        $preporuke = [];

        foreach ($stilovi as $stil) {
            $proizvodi = $stil->proizvodi()->inRandomOrder()->limit(3)->get();

            
            $preporuke[] = [
                'style' => $stil->naziv,
                'products' => $proizvodi->map(function ($proizvod) {
                    return [
                        'id' => $proizvod->id,
                        'name' => $proizvod->naziv,
                        'price' => $proizvod->cena,
                        'description'=>$proizvod->opis,
                        'image' => asset($proizvod->slika),  
                    ];
                }),
            ];
        }

        return response()->json($preporuke);
    }
}
