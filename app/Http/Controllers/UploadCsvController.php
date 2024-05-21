<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadCsvRequest;
use App\Imports\HotelsImport;
use App\Traits\ApiResponser;
use Maatwebsite\Excel\Facades\Excel;
use Inertia\Inertia;

class UploadCsvController extends Controller
{
    use ApiResponser;

    /**
     * Handle the incoming request.
     */
    public function import(UploadCsvRequest $request)
    {
        Excel::import(new HotelsImport, $request->file('csv_file'));

        // return Inertia::render('Hotels/Index');
        return;
    }

    public function show()
    {
        return Inertia::render('Hotels/Import');
    }
}
