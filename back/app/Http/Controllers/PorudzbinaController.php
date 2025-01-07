<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Porudzbina;
use App\Models\StavkaPorudzbine;
use App\Models\Korpa;
use App\Http\Resources\PorudzbinaResource;
use Illuminate\Support\Facades\Auth;

class PorudzbinaController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        if($user->role!='Shop Manager'){
            return response()->json([
                'error' => 'Nemate dozvolu za prikaz porudzbina.',
            ], 403); 
        }
    
        try {
            $validated = $request->validate([
                'status' => 'nullable|in:Primljena,Kompletirana', 
            ]);
    
           
            $status = $request->status; 
    
    
            $query = Porudzbina::query();
    
            
            if ($status) {
                $query->where('status', $status);
            }
    
            $query->orderBy('created_at', 'desc');
    
            $query->orderByRaw("FIELD(status, 'Primljena', 'Kompletirana')");
    
            $porudzbine = $query->paginate(10);
    
            return PorudzbinaResource::collection($porudzbine);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške pri učitavanju porudzbina.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function store(Request $request){
        try{

            $user = Auth::user();
            if($user->role!='Korisnik'){
                return response()->json([
                    'error' => 'Nemate dozvolu za da izvrsite porudzbinu.',
                ], 403); 
            }

            $korisnikId = $user->id;
            $korpaStavke  = Korpa::with('proizvod')->where('korisnik_id', $korisnikId)->get();

            $porudzbina = Porudzbina::create([
                'korisnik_id'=>$korisnikId,
                'status'=> 'Primljena',
                'ukupna_cena'=>0.0

            ]);

            $ukupnaCena=0.0;
            foreach ($korpaStavke as $korpaStavka) {
                
                StavkaPorudzbine::create([
                    'porudzbina_id'=>$porudzbina->id,
                    'proizvod_id' => $korpaStavka->proizvod->id,
                    'kolicina' => $korpaStavka->kolicina, 
                    'cena' => $korpaStavka->proizvod->cena, 
                    'korisnik_id' => $korisnikId, 
                ]);
                $ukupnaCena=$ukupnaCena + $korpaStavka->kolicina*$korpaStavka->proizvod->cena;
                
            }



            foreach ($korpaStavke as $korpaStavka) {

                $korpaStavka->delete();
            }
            $porudzbina->ukupna_cena=$ukupnaCena;
            $porudzbina->save();
           
            return response()->json([
                'message' => 'Porudzbina uspešno sacuvana!',
                'data' => new PorudzbinaResource($porudzbina),
            ], 201); 

        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške pri kreiranju porudzbine.',
                'error' => $e->getMessage(),
            ], 500);
        }
     
    }



    public function update(Request $request, $id){

        try{

            $user = Auth::user();
            if($user->role!='Shop Manager'){
                return response()->json([
                    'error' => 'Nemate dozvolu za da izvrsite porudzbinu.',
                ], 403); 
            }

           $validated = $request->validate([
                'status' => 'required|in:Primljena,Kompletirana', 
            ]);


            $porudzbina = Porudzbina::findOrFail($id);
            $porudzbina->status=$validated['status'];
            $porudzbina->save();

            return response()->json([
                'message' => 'Porudzbina uspešno azurirana!',
                'data' => $porudzbina,
            ], 201); 

        }catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Došlo je do greške pri azuriranju porudzbine.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
