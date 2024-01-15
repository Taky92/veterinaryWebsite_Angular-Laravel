<?php

namespace App\Http\Controllers;

use App\Models\Medication;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicationController extends Controller
{
    /**
     * Mostrar todas las medicaciones de una mascota según su id
     */
    public function showAllMedicationByPet(string $idPet)
    {

        $pet = Pet::find($idPet);

        if ($pet) {

            $medications = Medication::where('idPet', $idPet)->where('active', true)->get();

            if (count($medications) > 0) {
                return response()->json($medications, 200);
            } else {
                return response()->json(['message' => 'No se han encontrado medicaciones'], 200);
            }
        }

        return response()->json(['message' => 'No se ha encontrado la mascota'], 402);
    }

    /**
     * Añadir una medicación nueva a una mascota.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'start_date' => 'required|string|max:10',
            'end_date' => 'required|string|max:10',
            'treatment' => 'required|string|max:255',
            'idPet' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $medication = new Medication();
        $medication->name = $request->name;
        $medication->start_date = $request->start_date;
        $medication->end_date = $request->end_date;
        $medication->treatment = $request->treatment;
        $medication->idPet = $request->idPet;

        $medication->save();

        return response()->json($medication, 200);
    }

    /**
     * Elimina la medicación según su id.
     */
    public function destroy(string $idMedication)
    {

        $medication = Medication::find($idMedication);

        if ($medication) {

            $medication->active = false;
            $medication->update();

            return response()->json(['message' => 'Medicación eliminada correctamente'], 200);
        }

        return response()->json(['message' => 'No se ha encontrado la medicación'], 402);
    }

    /**
     * Elimina todas las medicaciones de una mascota según su id.
     */

    public function destroyMedicationsByPet(string $idPet)
    {

        $pet = Pet::find($idPet);

        if ($pet) {

            $medications = Medication::where('idPet', $idPet)->where('active', true)->get();

            if (count($medications) > 0) {

                foreach ($medications as $medication) {
                    $medication->active = false;
                    $medication->update();
                }

                return response()->json(['message' => 'Medicaciones eliminadas correctamente'], 200);
            } else {
                $medication = [];
            }
            return response()->json($medication, 200);
        }
        return response()->json(['message' => 'No se ha encontrado la mascota'], 402);

    }


}
