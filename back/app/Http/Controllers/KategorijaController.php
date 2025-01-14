<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kategorija;
use App\Http\Resources\KategorijaResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class KategorijaController extends Controller
{
    public function index()
    {
    
    try{
        
        $kategorije = Kategorija::all(); 
        return KategorijaResource::collection($kategorije);
    }
        
        catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri dodavanju kategorije.',
            ], 500); 
        }
    }


    public function store(Request $request)
    {
    try {


        $user = Auth::user();
        if($user->role!='Shop Manager'){
            return response()->json([
                'error' => 'Nemate dozvolu za kreiranje kategorije.',
            ], 403); 
        }
        $validated = $request->validate([
            'naziv' => 'required|string|max:255|unique:kategorije,naziv',
            'slika' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
        ]);

        
       
            $kategorija = Kategorija::create([
                'naziv' => $validated['naziv'], 
                'slika'=>$this->uploadImage($request->file('slika'), $validated['naziv']),
            ]);

          
            return response()->json([
                'message' => 'Kategorija uspešno dodata!',
                'data' => $kategorija,
            ], 201); 
        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri dodavanju kategorije.',
            ], 500); 
        }
    }


    
    private function uploadImage($file, $naziv)
{
    
    $sanitizedNaziv = preg_replace('/[^a-zA-Z0-9_-]/', '_', $naziv);
    $extension = $file->getClientOriginalExtension();
    $filename = $sanitizedNaziv . '.' . $extension;

   
    $path = 'app/' . $sanitizedNaziv;

    
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

    $pathFile = $file->storeAs($path, $filename,'public');

    
    return Storage::url($pathFile);
}


}
