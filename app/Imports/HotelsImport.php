<?php

namespace App\Imports;

use App\Models\Hotel;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class HotelsImport implements ToModel, WithCustomCsvSettings, WithHeadingRow, WithValidation
{
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        foreach ($row as $key => $value) {
            $row[$key] = trim($value);
        }

        return new Hotel([
            'name' => $row['hotel_name'],
            'image_url' => $row['image'],
            'city' => $row['city'],
            'address' => $row['address'],
            'description' => $row['description'],
            'stars' => $row['stars'],
        ]);
    }

    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';',
        ];
    }

    public function rules(): array
    {
        return [
            'hotel_name' => ['required', 'string', 'max:255'],
            'image' => ['required', 'url'],
            'city' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:1500'],
            'description' => ['nullable', 'string', 'max:1500'],
            'stars' => ['required', 'integer', 'min:1', 'max:5'],
        ];
    }
}
