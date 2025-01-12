<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategorijaController;
use App\Http\Controllers\StilController;
use App\Http\Controllers\ClanakController;
use App\Http\Controllers\ProizvodController;
use App\Http\Controllers\KorpaController;
use App\Http\Controllers\PorudzbinaController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

Route::post('/kategorije',[KategorijaController::class,'store']);
Route::get('/kategorije', [KategorijaController::class, 'index']);

Route::post('/stilovi',[StilController::class,'store']);
Route::get('/stilovi', [StilController::class, 'index']);

Route::post('clanci',[ClanakController::class,'store']);
Route::put('clanci/{id}',[ClanakController::class,'update']);
Route::get('clanci',[ClanakController::class,'index']);
Route::get('clanci/{id}',[ClanakController::class,'show']);

Route::post('proizvodi',[ProizvodController::class,'store']);
Route::put('proizvodi/{id}',[ProizvodController::class,'update']);
Route::get('proizvodi',[ProizvodController::class,'index']);
Route::get('proizvodi/{id}',[ProizvodController::class,'show']);

Route::post('korpa/dodaj',[KorpaController::class,'dodajUKorpu']);
Route::post('korpa/izbaci',[KorpaController::class,'izbaciIzKorpe']);
Route::get('korpa/prikaz',[KorpaController::class,'prikazKorpe']);


Route::get('porudzbine',[PorudzbinaController::class,'index']);
Route::post('porudzbine',[PorudzbinaController::class,'store']);
Route::put('porudzbine/{id}',[PorudzbinaController::class,'update']);
});

