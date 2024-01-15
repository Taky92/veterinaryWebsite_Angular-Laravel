<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
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
            'pdf' => $this->faker->word . '.pdf',
            'description' => $this->faker->text(100),
            'date' => $this->faker->date('d/m/y'),
            'idPet' => $this->faker->numberBetween(1, 7),
        ];
    }
}
