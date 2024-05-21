<?php

namespace App\Observers;

use App\Models\Hotel;

class HotelObserver
{
    /**
     * Handle the Hotel "create" and "update" event right before happen.
     */
    public function saving(Hotel $hotel): void
    {
        if (!$hotel->description) {
            $hotel->description = '';
        }
    }
}
