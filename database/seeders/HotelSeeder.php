<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class HotelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Hotel::factory(28)->create();
        \App\Models\Hotel::factory()->create([
            'name' => 'Hotel test_California',
        ]);
        \App\Models\Hotel::factory()->create([
            'name' => 'test_California Hall',
        ]);
    }
}
