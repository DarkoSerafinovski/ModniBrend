<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Clanak>
 */
class ClanakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'korisnik_id' => User::where('role', 'Bloger')->inRandomOrder()->first()->id,
            'naslov' => $this->faker->sentence,
            'sadrzaj' => $this->faker->paragraph,
            'slika' => 'images/' . $this->faker->word . '.jpg',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
