<?php

namespace App\Services;

use App\Models\Hotel;

class HotelService
{
    public function getPublicListingPaginated($amount = 15, string $query = '')
    {
        return Hotel::select(['id', 'name', 'image_url', 'stars', 'city'])
            ->whereAny([
                'name',
                'city',
            ], 'LIKE', '%' . $query . '%')
            ->paginate($amount);
    }

    public function getById($id)
    {
        return Hotel::findOrFail($id);
    }

    public function create(array $data)
    {
        return Hotel::create($data);
    }

    public function update(array $data, Hotel $hotel)
    {
        $allowedFields = (new Hotel)->getFillable();

        foreach ($allowedFields as $fieldName) {
            if (isset($data[$fieldName])) {
                $hotel->$fieldName = $data[$fieldName];
            }
        }

        $hotel->save();

        return $hotel;
    }

    public function delete(Hotel $hotel)
    {
        $hotel->delete();
        return true;
    }
}
