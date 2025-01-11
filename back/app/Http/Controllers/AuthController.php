<?php
 
namespace App\Http\Controllers;
 
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
 
class AuthController extends Controller
{
    public function register(Request $request)
    {
        try{
            $request->validate([
                'username' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'role' => 'required|string|in:Korisnik',
                'stilovi' => 'required|array',
                'stilovi.*.id' => 'exists:stilovi,id',
            ]);

            
        $user = User::create([
            'username'=> $request->username,
            'email'=> $request->email,
            'password'=> Hash::make($request->password),
            'role'=>$request->role
        ]);

        $stilovi = collect($request->stilovi)->pluck('id');
        $user->stilovi()->sync($stilovi);
 
        $token = $user->createToken('auth_token')->plainTextToken;
 
        return response()->json(['success'=>true,'data'=> $user, 'access_token'=> $token, 'token_type'=> 'Bearer']);
        }catch (\Exception $e) {
               
            return response()->json([
                'success' => false,
                'message' =>   'Članak nije pronađen',
                'error' => $e->getMessage(),
            ], 404);
        }

       
 
        
 
      
    }
 
    public function login(Request $request)
    {

        \Log::info('Login attempt: ', ['email' => $request->email, 'password' => $request->password]);
      
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json(['success'=> false]);
        }
 
        $user = User::where('email', $request['email'])->firstOrFail();
 
        $token = $user->createToken('auth_token')->plainTextToken;
 
        return response()->json(['success'=>true,'data'=> $user, 'access_token'=> $token, 'token_type'=> 'Bearer','role'=>$user->role]);
    }
 
    public function logout(Request $request)
    {
       $request->user()->tokens()->delete();
       return response()->json(['message'=> 'Successfully logged out!']);
    }
}