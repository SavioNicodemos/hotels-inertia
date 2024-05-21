<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hotel>
 */
class HotelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company,
            'image_url' => $this->faker->imageUrl(),
            'city' => $this->faker->city,
            'address' => $this->faker->streetAddress,
            'description' => $this->faker->text,
            'stars' => $this->faker->numberBetween(1, 5),
        ];
    }
}
