<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Proizvod;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Korpa>
 */
class KorpaFactory extends Factory
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
            'proizvod_id' => Proizvod::inRandomOrder()->first()->id,
            'kolicina' => $this->faker->numberBetween(1, 5),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
