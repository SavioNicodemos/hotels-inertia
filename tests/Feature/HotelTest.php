<?php

beforeEach(function () {
    $this->seed();
});

describe('Hotel', function () {
    test('can view paginated hotels', function () {
        $response = $this->get(route('hotels.index'));

        $response->assertStatus(200);

        expect($response->json()['data']['data'])->toHaveLength(15);
    });

    test('can search paginated hotels', function () {
        $response = $this->get(route('hotels.index', ['query' => 'test_California']));

        $response->assertStatus(200);

        expect($response->json()['data']['data'])->toHaveLength(2);
    });

    test('can view a second page of paginated hotels', function () {
        $firstResponse = $this->get(route('hotels.index', ['page' => 1]));
        $firstHotelExample = $firstResponse->json()['data']['data'][0];

        $secondResponse = $this->get(route('hotels.index', ['page' => 2]));
        $secondHotelExample = $secondResponse->json()['data']['data'][0];

        $firstResponse->assertStatus(200);
        $secondResponse->assertStatus(200);

        expect($firstHotelExample['id'])->not->toBe($secondHotelExample['id']);

        expect($secondResponse->json()['data']['data'])->toHaveLength(15);
    });

    it('should return the targeted list structure', function () {
        $response = $this->get(route('hotels.index', ['page' => 1]));

        $hotelExample = $response->json()['data']['data'][0];

        expect($hotelExample['id'])->toBeInt();
        expect($hotelExample['name'])->toBeString();
        expect($hotelExample['image_url'])->toBeString();
        expect($hotelExample['stars'])->toBeInt();
        expect($hotelExample['city'])->toBeString();

        // Not should retrieve
        $this->assertArrayNotHasKey('description', $hotelExample);
        $this->assertArrayNotHasKey('address', $hotelExample);
    });

    test('cannot search hotels that does not exist', function () {
        $response = $this->get(route('hotels.index', ['query' => 'non_existent_hotel']));
        $response->assertStatus(200);

        expect($response->json()['data']['data'])->toHaveLength(0);
    });

    test('can view a hotel', function () {
        $response = $this->get(route('hotels.show', ['hotel' => 1]));

        $response->assertStatus(200);

        $jsonResponse = $response->json();

        expect($jsonResponse['data']['id'])->toBe(1);
    });

    it('should return the structure for individual hotel', function () {
        $response = $this->get(route('hotels.show', ['hotel' => 1]));

        $individualHotel = $response->json()['data'];

        expect($individualHotel['id'])->toBeInt();
        expect($individualHotel['name'])->toBeString();
        expect($individualHotel['image_url'])->toBeString();
        expect($individualHotel['stars'])->toBeInt();
        expect($individualHotel['city'])->toBeString();
        expect($individualHotel['description'])->toBeString();
        expect($individualHotel['address'])->toBeString();
    });

    test('can create a hotel', function () {
        $response = $this->post(route('hotels.store'), [
            'name' => 'Hotel test',
            'stars' => 5,
            'city' => 'California',
            'description' => 'This is a test hotel',
            'address' => 'Test address',
            'image_url' => 'https://via.placeholder.com/150',
        ]);

        $response->assertStatus(201);

        $newHotel = $response->json()['data'];

        expect($newHotel['name'])->toBe('Hotel test');
        expect($newHotel['stars'])->toBe(5);
        expect($newHotel['city'])->toBe('California');
        expect($newHotel['description'])->toBe('This is a test hotel');
        expect($newHotel['address'])->toBe('Test address');
        expect($newHotel['image_url'])->toBe('https://via.placeholder.com/150');
    });

    test('can update a hotel', function () {
        $response = $this->put(route('hotels.update', ['hotel' => 1]), [
            'name' => 'Hotel test updated',
            'stars' => 4,
            'city' => 'California',
            'description' => 'This is a test hotel updated',
            'address' => 'Test address updated',
            'image_url' => 'https://via.placeholder.com/150',
        ]);

        $response->assertStatus(200);

        $updatedHotel = $response->json()['data'];

        expect($updatedHotel['name'])->toBe('Hotel test updated');
        expect($updatedHotel['stars'])->toBe(4);
        expect($updatedHotel['city'])->toBe('California');
        expect($updatedHotel['description'])->toBe('This is a test hotel updated');
        expect($updatedHotel['address'])->toBe('Test address updated');
        expect($updatedHotel['image_url'])->toBe('https://via.placeholder.com/150');
    });

    test('can delete a hotel', function () {
        $response = $this->delete(route('hotels.destroy', ['hotel' => 1]));

        $response->assertStatus(204);
    });

    test('cannot delete a hotel that does not exist', function () {
        $response = $this->delete(route('hotels.destroy', ['hotel' => 999]));

        $response->assertStatus(404);
    });

    test('cannot create a hotel with invalid data', function () {
        $response = $this->post(route('hotels.store'), [
            'test_invalid' => 'Invalid test data',
        ]);

        $response->assertStatus(422);
    });

    test('cannot update a hotel with invalid data', function () {
        $response = $this->put(route('hotels.update', ['hotel' => 1]), [
            'name' => null,
        ]);

        $response->assertStatus(422);
    });

    test('cannot create a hotel with invalid image url', function () {
        $response = $this->post(route('hotels.store'), [
            'name' => 'Hotel test',
            'stars' => 5,
            'city' => 'California',
            'description' => 'This is a test hotel',
            'address' => 'Test address',
            'image_url' => 'invalid_url',
        ]);

        $response->assertStatus(422);
    });

    test('cannot update a hotel with invalid image url', function () {
        $response = $this->put(route('hotels.update', ['hotel' => 1]), [
            'name' => 'Hotel test updated',
            'stars' => 4,
            'city' => 'California',
            'description' => 'This is a test hotel updated',
            'address' => 'Test address updated',
            'image_url' => 'invalid_url',
        ]);

        $response->assertStatus(422);
    });

    test('cannot create a hotel with invalid stars', function () {
        $response = $this->post(route('hotels.store'), [
            'name' => 'Hotel test',
            'stars' => 6,
            'city' => 'California',
            'description' => 'This is a test hotel',
            'address' => 'Test address',
            'image_url' => 'https://via.placeholder.com/150',
        ]);

        $response->assertStatus(422);
    });

    test('cannot update a hotel with invalid stars', function () {
        $response = $this->put(route('hotels.update', ['hotel' => 1]), [
            'name' => 'Hotel test updated',
            'stars' => 6,
            'city' => 'California',
            'description' => 'This is a test hotel updated',
            'address' => 'Test address updated',
            'image_url' => 'https://via.placeholder.com/150',
        ]);

        $response->assertStatus(422);
    });

    test('can import an csv file of hotels', function () {
        // Note: For this test need to be aware that have an valid hotel csv file
        // in storage/app/public/hotels.csv

        $response = $this->post(route('hotels.import'), [
            'csv_file' => new \Illuminate\Http\UploadedFile(
                storage_path('app/public/hotels.csv'),
                'hotels.csv',
                'text/csv',
                null,
                true
            ),
        ]);

        $response->assertStatus(200);
    });

    it('should increase the quantity of hotels when upload a file', function () {
        // Note: For this test need to be aware that have an valid hotel csv file
        // in storage/app/public/hotels.csv

        $firstGetResponse = $this->get(route('hotels.index'));
        $firstCount = $firstGetResponse->json()['data']['total'];

        $this->post(route('hotels.import'), [
            'csv_file' => new \Illuminate\Http\UploadedFile(
                storage_path('app/public/hotels.csv'),
                'hotels.csv',
                'text/csv',
                null,
                true
            ),
        ]);

        $secondGetResponse = $this->get(route('hotels.index'));
        $secondCount = $secondGetResponse->json()['data']['total'];

        expect($secondCount)->toBeGreaterThan($firstCount);
    });

    test('cannot import an invalid csv file of hotels', function () {
        $response = $this->post(route('hotels.import'), [
            'csv_file' => new \Illuminate\Http\UploadedFile(
                storage_path('app/public/invalid_hotels.csv'),
                'invalid_hotels.csv',
                'text/csv',
                null,
                true
            ),
        ]);

        $response->assertStatus(422);
    });
});
