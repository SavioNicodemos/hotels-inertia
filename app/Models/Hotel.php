<?php

namespace App\Models;

use App\Observers\HotelObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string $name
 * @property int $id
 */
#[ObservedBy([HotelObserver::class])]
class Hotel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'image_url',
        'city',
        'address',
        'description',
        'stars',
    ];

    protected $casts = [
        'stars' => 'integer',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];
}
