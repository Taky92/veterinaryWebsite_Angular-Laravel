<?php

namespace App\Http\Controllers;

use App\Models\Date;
use App\Models\Pet;
use App\Models\Veterinary;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DateController extends Controller
{
    /**
     * Mostrar todas las citas de un veterinario según su id
     */
    public function showAllDatesByVet(string $idVeterinary){

        $veterinary = Veterinary::find($idVeterinary);

        if($veterinary){

            $dates = Date::where('idVeterinary', $idVeterinary)->where('active', true)->get();

            if (count($dates)>0){
                return response()->json($dates, 200);

            }else{
                return response()->json(['message' => 'No se han encontrado citas del veterinario'], 200);
            }

        }

        return response()->json(['message' => 'No se ha encontrado el veterinario'], 403);
    }

    /**
     * Mostrar todas las citas de una mascota según su id
     */

    public function showAllDatesByPet(string $idPet){

        $pet = Pet::find($idPet);

        if($pet){

            $dates = Date::where('idPet', $idPet)->where('active', true)->get();

            if (count($dates)>0){
                return response()->json($dates, 200);

            }else{
                $dates = array();
                return response()->json($dates, 200);
            }
        }

        return response()->json(['message' => 'No se ha encontrado la mascota'], 402);
    }

    /**
     * Mostrar las horas ocupadas de un veterinario según su id y la fecha
     */

    public function showAllDatesByVetAndDate(string $idVeterinary, string $date){

        $veterinary = Veterinary::find($idVeterinary);

        if($veterinary){

            $formattedDate = Carbon::parse($date)->format('d/m/Y');

            $dates = Date::where('idVeterinary', $idVeterinary)->where('date', $formattedDate)->where('active', true)->get();

            if (count($dates)>0){
                $hours = array();

                foreach ($dates as $date){
                    array_push($hours, $date->time);
                }

                return response()->json($hours, 200);

            }else{

                return response()->json(['message' => 'No se han encontrado citas del veterinario'], 200);
            }

        }

        return response()->json(['message' => 'No se ha encontrado el veterinario'], 403);
    }



    /**
     * Añadir una cita nueva a una mascota.
     */
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'date' => 'required|string|max:10',
            'time' => 'required|string|max:5',
            'reason' => 'required|string|max:150',
            'idPet' => 'required',
            'idVeterinary' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $date = new Date();
        $date->date = $request->date;
        $date->time = $request->time;
        $date->reason = $request->reason;
        $date->idPet = $request->idPet;
        $date->idVeterinary = $request->idVeterinary;

        $date->save();

        return response()->json('Cita creada correctamente', 200);
    }

    /**
     * Muestra la cita según su id.
     */
    public function show(string $idDate){

        $date = Date::where('idDate', $idDate)->where('active', true)->first();

        if($date){
            return response()->json($date, 200);
        }

        return response()->json(['message' => 'No se ha encontrado la cita'], 404);
    }

    /**
     * Elimina la cita según su id.
     */
    public function destroy(string $idDate){

        $date = Date::find($idDate);

        if($date){
            $date->active = false;
            $date->update();

            return response()->json('Cita eliminada correctamente', 200);

        }

        return response()->json(['message' => 'No se ha encontrado la cita'], 404);
    }

    /**
     * Elimina todas las citas de una mascota según su id.
     */

    public function destroyDatesByPet(string $idPet)
    {

        $dates = Date::where('idPet', $idPet)->get();

        if (count($dates) > 0) {
            foreach ($dates as $date) {
                $date->active = false;
                $date->update();
            }

            return response()->json('Citas eliminadas correctamente', 200);

        }

        return response()->json(['message' => 'No se han encontrado citas de la mascota'], 404);
    }
}
