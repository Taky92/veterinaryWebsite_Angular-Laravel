<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MedicationController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VaccineController;
use App\Http\Controllers\VeterinaryController;
use App\Http\Controllers\DateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function (){
    /** Desloguearse */
    Route::get('/logout', [AuthController::class, 'logout']);
});

/** Rutas de PDF */

Route::get('storage/pdfs/{filename}', function ($filename) {
    $path = storage_path("app/public/pdfs/{$filename}");

    if (!Storage::exists("public/pdfs/{$filename}")) {
        abort(404);
    }

    return response()->file($path);
});

/** Rutas de autenticación */
Route::post('/user/register', [AuthController::class, 'register']);
Route::post('/user/login', [AuthController::class, 'userLogin']);
Route::post('/admin/login', [AuthController::class, 'adminLogin']);

/** Rutas de usuario */
Route::get('/users',[UserController::class ,'index']);
Route::get('/users/{id}', [UserController::class,'show']);
Route::get('/users/phone/{phone}', [UserController::class, 'showUserByPhone']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}', [UserController::class, 'update']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

/** Rutas de mascotas */
Route::get('/pets/user/{idUser}', [PetController::class, 'showPetsByUser']);
Route::get('/pets/vet/{idVeterinary}', [PetController::class, 'showPetsByVet']);
Route::get('/pets/{id}', [PetController::class, 'show']);
Route::get('/pets/name/{id}', [PetController::class, 'showNamePet']);
Route::post('/pets', [PetController::class, 'store']);
Route::put('/pets/{id}', [PetController::class, 'update']);
Route::delete('/pets/{id}', [PetController::class, 'destroy']);
Route::delete('/pets/user/{idUser}', [PetController::class, 'destroyPetsByUser']);

/** Rutas de informes */
Route::get('/reports/pet/{idPet}', [ReportController::class, 'showAllReportByPet']);
Route::get('/reports/{id}', [ReportController::class, 'show']);
Route::post('/reports', [ReportController::class, 'store']);
Route::delete('/reports/{id}', [ReportController::class, 'destroy']);
Route::delete('/reports/pet/{idPet}', [ReportController::class, 'destroyReportsByPet']);

/** Rutas de pdf */
Route::get('/pdfs/{filename}', [ReportController::class, 'getPdf']);

/** Rutas de vacunas */
Route::get('/vaccines/pet/{idPet}', [VaccineController::class, 'showAllVaccineByPet']);
Route::get('/vaccines/{id}', [VaccineController::class, 'show']);
Route::post('/vaccines', [VaccineController::class, 'store']);
Route::delete('/vaccines/{id}', [VaccineController::class, 'destroy']);
Route::delete('/vaccines/pet/{idPet}', [VaccineController::class, 'destroyVaccinesByPet']);

/** Rutas de medicaciones */
Route::get('/medications/pet/{idPet}', [MedicationController::class, 'showAllMedicationByPet']);
Route::get('/medications/{id}', [MedicationController::class, 'show']);
Route::post('/medications', [MedicationController::class, 'store']);
Route::delete('/medications/{id}', [MedicationController::class, 'destroy']);
Route::delete('/medications/pet/{idPet}', [MedicationController::class, 'destroyMedicationsByPet']);

/** Rutas de veterinarios */
Route::get('/veterinaries', [VeterinaryController::class, 'index']);
Route::get('/veterinaries/{idVeterinary}', [VeterinaryController::class, 'show']);
Route::get('/veterinaries/name/{idVeterinary}', [VeterinaryController::class, 'showNameVeterinary']);
Route::post('/veterinaries', [VeterinaryController::class, 'store']);

/** Rutas de citas */
Route::get('/dates/vet/{idVeterinary}', [DateController::class, 'showAllDatesByVet']);
Route::get('/dates/pet/{idPet}', [DateController::class, 'showAllDatesByPet']);
Route::get('/dates/vet/{idVeterinary}/{date}', [DateController::class, 'showAllDatesByVetAndDate']);
Route::get('/dates/{id}', [DateController::class, 'show']);
Route::post('/dates', [DateController::class, 'store']);
Route::delete('/dates/{id}', [DateController::class, 'destroy']);
Route::delete('/dates/pet/{idPet}', [DateController::class, 'destroyDatesByPet']);
