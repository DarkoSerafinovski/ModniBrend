<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Stil;
use App\Models\Kategorija;
use App\Models\Proizvod;
use App\Models\Porudzbina;
use App\Models\StavkaPorudzbine;
use App\Models\Korpa;
use App\Models\Clanak;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $stilovi = Stil::factory()->count(10)->create();
        $kategorije = Kategorija::factory()->count(5)->create();
        // $korisnici = User::factory(12)->hasAttached($stilovi->random(3),'stilovi')->create();
        // $proizvodi = Proizvod::factory(20)->hasAttached($stilovi->random(2),'stilovi')->create();
        $korisnici=User::factory()->count(20)->create();
        foreach ($korisnici as $korisnik) {
            $korisnik->stilovi()->attach($stilovi->random(3));  
        }

        $proizvodi=Proizvod::factory()->count(100)->create();
        foreach ($proizvodi as $proizvod) {
            $proizvod->stilovi()->attach($stilovi->random(3));  
        }
        $korpe=Korpa::factory()->count(10)->create();
        $porudzbine=Porudzbina::factory()->count(15)->create();
        $stavke_porudzbine =StavkaPorudzbine::factory()->count(30)->create();




        $porudzbine->each(function ($porudzbina) {
            if ($porudzbina->stavkePorudzbine()->count() === 0) {
                $porudzbina->delete();
            }
        });

        
        Porudzbina::all()->each(function ($porudzbina) {
            $ukupnaCena = $porudzbina->stavkePorudzbine->sum(function ($stavka) {
                return $stavka->kolicina * $stavka->cena;
            });

            $porudzbina->update(['ukupna_cena' => $ukupnaCena]);
        });

        $clanci=Clanak::factory()->count(20)->create();

       
       
    }
}
