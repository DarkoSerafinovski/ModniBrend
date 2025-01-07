<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Porudzbina;
use App\Models\Proizvod;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StavkaPorudzbine>
 */
class StavkaPorudzbineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'porudzbina_id' => Porudzbina::inRandomOrder()->first()->id,
            'proizvod_id' => Proizvod::inRandomOrder()->first()->id,
            'kolicina' => $this->faker->numberBetween(1, 5),
            'cena' => function (array $attributes) {
                return Proizvod::find($attributes['proizvod_id'])->cena;
            },
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
