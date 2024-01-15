<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public $times = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
    public function definition(): array
    {
        return [
            'date' => $this->faker->date('d/m/y'),
            'time' => $this->faker->randomElement($this->times),
            'reason' => $this->faker->text(100),
            'idPet' => $this->faker->unique()->numberBetween(1, 7),
            'idVeterinary' => $this->faker->numberBetween(1, 3),
        ];
    }
}
