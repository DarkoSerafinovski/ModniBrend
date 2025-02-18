<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Korpa;
use App\Http\Resources\KorpaResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class KorpaController extends Controller
{
    public function dodajUKorpu(Request $request)
{
    try {
        
        $user = Auth::user();
        if($user->role!='Korisnik'){
            return response()->json([
                'error' => 'Nemate dozvolu za dodavanje proizvoda u korpu.',
            ], 403); 
        }


        $validated = $request->validate([
            'proizvod_id' => 'required|exists:proizvodi,id',
        ]);

        
        $proizvodId = $validated['proizvod_id'];
        $korisnikId = $user->id;

        
        $korpa = Korpa::where('korisnik_id', $korisnikId)
        ->where('proizvod_id', $proizvodId)
        ->first();

        if ($korpa) {
            $korpa->kolicina += 1;
            $korpa->save();
        } else {
            
           $korpa = Korpa::create([
            'korisnik_id'=>$korisnikId,
            'proizvod_id'=>$proizvodId,
            'kolicina'=>1
           ]);
        }
        return response()->json([
            'message' => 'Proizvod je uspesno dodat u korpu.',
            'data' => $korpa,
        ], 201); 
        } catch (\Exception $e) {
            return response()->json(['error' => 'Došlo je do greške: ' . $e->getMessage()], 500);
        }
    }


    public function izbaciIzKorpe(Request $request)
    {
        try {
            
            $user = Auth::user();
            if($user->role!='Korisnik'){
                return response()->json([
                    'error' => 'Nemate dozvolu za izbacivanje proizvoda iz korpe.',
                ], 403); 
            }
    
    
            $validated = $request->validate([
                'korpa_id' => 'required|exists:korpe,id',
            ]);
    
            
            $korpaId = $validated['korpa_id'];
            $korisnikId = $user->id;
    
            
            $korpa=Korpa::findOrFail($korpaId);
    
            if ($korpa && $korpa->kolicina > 1) {
                $korpa->kolicina -= 1;
                $korpa->save();
              
            } else {
                
               $korpa->delete();
               $korpa='';
            }
    
            return response()->json([
                'message' => 'Proizvod je uspesno ukonjen iz korpe.',
                'data' => $korpa,
            ], 201); 
            } catch (\Exception $e) {
                return response()->json(['error' => 'Došlo je do greške: ' . $e->getMessage()], 500);
            }
        }


        public function prikazKorpe(){
            try{
                $korisnik = Auth::user();
                $korisnikId = $korisnik->id;
                Log::info('Korisnik id:' . $korisnikId);
                $korpaStavke  = Korpa::with('proizvod')->where('korisnik_id', $korisnikId)->get();
                $ukupnaCena = $korpaStavke->sum(function ($stavka) {
                    return $stavka->kolicina * $stavka->proizvod->cena;
                });

               return response()->json(['stavke_korpe'=>KorpaResource::collection($korpaStavke),'ukupna_cena'=>$ukupnaCena,'korisnik'=>$korisnik]);

            }catch (\Exception $e) {
                return response()->json(['error' => 'Došlo je do greške: ' . $e->getMessage()], 500);
            }
        }

}
