<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medication>
 */
class MedicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
            'start_date' => $this->faker->date('d/m/y'),
            'end_date' => $this->faker->date('d/m/y'),
            'treatment' => $this->faker->numberBetween(1,2). ' comp/dia',
            'idPet' => $this->faker->numberBetween(1, 7),
        ];
    }
}
