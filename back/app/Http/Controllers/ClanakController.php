<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clanak;
use App\Http\Resources\ClanakResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ClanakController extends Controller
{
    public function index()
    {
        $clanci = Clanak::paginate(3); 
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
            'sadrzaj' => 'required|string',
            'slika' => 'required|image|mimes:jpeg,png,jpg,gif,svg', 
        ]);

        
        try {
            $clanak = Clanak::create([
                'naslov' => $validated['naslov'], 
                'sadrzaj'=>$validated['sadrzaj'],
                'korisnik_id'=>$user->id,
                'slika'=>$this->uploadImage($request->file('slika'), $validated['naslov']),
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
                'slika' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg', 
            ]);
    
           
            $clanak = Clanak::findOrFail($id);
            $clanak->naslov =   $validated['naslov'];
            $clanak->sadrzaj =   $validated['sadrzaj'];

            if ($request->hasFile('slika')) {
                if (File::exists($clanak->slika)) {
                    File::delete($clanak->slika);
                }
               $clanak->slika =  $this->uploadLogo($request->file('slika'),$validated['naslov']);
    
            }



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
