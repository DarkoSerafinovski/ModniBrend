<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Kategorija;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proizvod>
 */
class ProizvodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->word,
            'opis' => $this->faker->sentence,
            'cena' => $this->faker->randomFloat(2, 10, 500),
            'putanja_slike' => 'images/' . $this->faker->word . '.jpg',
            'kategorija_id' => Kategorija::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
