<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Models\Hotel;
use App\Services\HotelService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HotelController extends Controller
{

    public function __construct(private HotelService $service)
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $validated = $this->validate($request, [
            'query' => 'string|nullable',
        ]);

        $hotels = $this->service->getPublicListingPaginated(15, $validated['query'] ?? '');

        return Inertia::render('Hotels/Index', [
            'hotelsPaginated' => $hotels,
        ]);
    }

    public function create()
    {
        return Inertia::render('Hotels/Manage');
    }

    public function store(StoreHotelRequest $request)
    {
        $hotel = $this->service->create($request->validated());

        return to_route('hotels.show', $hotel->id);
    }

    public function show(int $hotel)
    {
        return Inertia::render('Hotels/Show', [
            'hotel' => $this->service->getById($hotel),
        ]);
    }

    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        $this->service->update($request->validated(), $hotel);

        return to_route('hotels.show', $hotel->id);
    }

    public function edit(Hotel $hotel)
    {
        return Inertia::render('Hotels/Manage', [
            'hotel' => $hotel,
        ]);
    }

    public function destroy(Hotel $hotel)
    {
        $this->service->delete($hotel);

        return to_route('hotels.index');
    }
}
