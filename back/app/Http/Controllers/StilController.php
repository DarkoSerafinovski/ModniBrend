<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stil;
use App\Http\Resources\StilResource;

class StilController extends Controller
{
    public function index()
    {
        $stilovi = Stil::all(); 
        return StilResource::collection($stilovi);
        
    }


    public function store(Request $request)
    {
     try {  


        $user = Auth::user();
        if($user->role!='Shop Manager'){
            return response()->json([
                'error' => 'Nemate dozvolu za kreiranje proizvoda.',
            ], 403); 
        }


        $validated = $request->validate([
            'naziv' => 'required|string|max:255|unique:stilovi,naziv',
            
        ]);

        
     
            $Stil = Stil::create([
                'naziv' => $validated['naziv'], 
            ]);

          
            return response()->json([
                'message' => 'Stil uspešno dodat!',
                'data' => $Stil,
            ], 201); 
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri dodavanju stila.',
            ], 500); 
        }
    }

}
