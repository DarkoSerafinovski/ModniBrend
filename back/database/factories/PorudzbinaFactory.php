<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Porudzbina>
 */
class PorudzbinaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'korisnik_id' => User::where('role', 'Korisnik')->inRandomOrder()->first()->id,
            'status' => $this->faker->randomElement(['Primljena', 'Kompletirana']),
            'ukupna_cena'=>0.0,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
