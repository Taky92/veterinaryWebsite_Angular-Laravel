<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\Vaccine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VaccineController extends Controller
{
    /**
     * Muestra todas las vacunas de una mascota según su id
     */
    public function showAllVaccineByPet(string $idPet){

        $pet = Pet::find($idPet);

        if($pet){

            $vaccines = Vaccine::where('idPet', $idPet)->where('active', true)->get();

            if (count($vaccines)>0){
                return response()->json($vaccines, 200);

            }else{
                return response()->json(['message' => 'No se han encontrado vacunas de la mascota'], 200);
            }
        }

        return response()->json(['message' => 'No se ha encontrado la mascota'], 402);
    }

    /**
     * Añadir una vacuna nueva a una mascota.
     */
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:100',
            'date' => 'required|string|max:10',
            'expiration' => 'required|string|max:10',
            'idPet' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $vaccine = new Vaccine();
        $vaccine->name = $request->name;
        $vaccine->date = $request->date;
        $vaccine->expiration = $request->expiration;
        $vaccine->idPet = $request->idPet;

        $vaccine->save();

        return response()->json($vaccine, 200);
    }

    /**
     * Elimina la vacuna según su id.
     */
    public function destroy(string $idVaccine){

        $vaccine = Vaccine::find($idVaccine);

        if($vaccine){
            $vaccine->active = false;
            $vaccine->update();
            return response()->json(['message' => 'Vacuna eliminada correctamente'], 200);
        }

        return response()->json(['message' => 'No se ha encontrado la vacuna'], 402);
    }

    /**
     * Elimina todas las vacunas de una mascota según su id.
     */
    public function destroyVaccinesByPet(string $idPet)
    {

        $vaccines = Vaccine::where('idPet', $idPet)->get();

        if (count($vaccines) > 0) {
            foreach ($vaccines as $vaccine) {
                $vaccine->active = false;
                $vaccine->update();
            }
            return response()->json(['message' => 'Vacunas eliminadas correctamente'], 200);
        }

        return response()->json(['message' => 'No se han encontrado vacunas de la mascota'], 402);
    }
}
