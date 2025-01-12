<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clanak;
use App\Http\Resources\ClanakResource;
use Illuminate\Support\Facades\Auth;

class ClanakController extends Controller
{
    public function index()
    {
        $clanci = Clanak::paginate(5); 
        return ClanakResource::collection($clanci);
        
    }


    public function store(Request $request)
    {
        

        $user = Auth::user();
        if($user->role!='Bloger'){
            return response()->json([
                'error' => 'Nemate dozvolu za kreiranje clanka.',
            ], 403); 
        }
        $validated = $request->validate([
            'naslov' => 'required|string|max:255',
            'sadrzaj' => 'required|string'
        ]);

        
        try {
            $clanak = Clanak::create([
                'naslov' => $validated['naslov'], 
                'sadrzaj'=>$validated['sadrzaj'],
                'korisnik_id'=>$user->id,
            ]);

          
            return response()->json([
                'message' => 'Clanak uspešno dodat!',
                'data' => $clanak,
            ], 201); 
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri dodavanju clanka.',
            ], 500); 
        }
    }



    public function show($id){

        try{

            $clanak = Clanak::findOrFail($id);
            return new ClanakResource($clanak);
        
        }catch (\Exception $e) {
               
                return response()->json([
                    'success' => false,
                    'message' => 'Neuspesno ucitavanje clanka. Pokusajte ponovo.',
                    'error' => $e->getMessage(),
                ], 500);
            }
    }



    public function update(Request $request, $id)
    {
        try{

            $validated= $request->validate([
                'naslov' => 'required|string|max:255',
                'sadrzaj' => 'required|string',
            ]);
    
           
            $clanak = Clanak::findOrFail($id);
            $clanak->naslov =   $validated['naslov'];
            $clanak->sadrzaj =   $validated['sadrzaj'];
            $clanak->save();

            return response()->json([
                'message' => 'Članak uspešno ažuriran',
                'clanak' => $clanak,
            ], 200);
        }catch (\Exception $e) {
               
            return response()->json([
                'success' => false,
                'message' =>   'Članak nije pronađen',
                'error' => $e->getMessage(),
            ], 404);
        }
      
      
    }

}
