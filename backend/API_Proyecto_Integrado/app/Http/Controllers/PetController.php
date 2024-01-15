<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PetController extends Controller
{
    /** Añadir mascota */
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'species' => 'required|string|in:dog,cat',
            'gender' => 'required|string|in:male,female',
            'birthdate' => 'required|string',
            'photo' => 'required|string',
            'idUser' => 'required',
            'idVeterinary' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $pet = new Pet();
        $pet->name = $request->name;
        $pet->species = $request->species;
        $pet->gender = $request->gender;
        $pet->birthdate = $request->birthdate;
        $pet->photo = $request->photo;
        $pet->idUser = $request->idUser;
        $pet->idVeterinary = $request->idVeterinary;

        $pet->save();

        return response()->json('Mascota creada correctamente', 200);

    }

    /** mostrar los datos de una mascota segun id **/
    public function show(string $idPet){

        $pet = Pet::where('idPet', $idPet)->where('active', true)->first();

        if (is_null($pet)) {

            return response()->json(['message' => 'Mascota no encontrada'], 404);
        }

        return response()->json($pet, 200);
    }

    /** mostrar las mascotas de un usuario segun su id **/
    public function showPetsByUser(string $idUser){

        $user = User::find($idUser);

        if($user){

            $pets = Pet::where('idUser', $idUser)->where('active', true)->get();
            if (count($pets) > 0){
                return response()->json($pets, 200);

            }else{
                $pets = [];
                return response()->json($pets,  200);
            }
        }

        return response()->json(['message' => 'Usuario no encontrado'], 402);
    }

    /** Mostrar las mascotas de un veterinario segun su id */

    public function showPetsByVet(string $idVeterinary){

        $pets = Pet::where('idVeterinary', $idVeterinary)->where('active', true)->get();

        if (count($pets) > 0){
            return response()->json($pets, 200);

        }else{
            $pets = [];
            return response()->json($pets, 200);
        }
    }


    /** Mostrar el nombre de la mascota segun su id */
    public function showNamePet(string $idPet){

        $pet = Pet::find($idPet);

        if (is_null($pet)) {
            return response()->json(['message' => 'Mascota no encontrada'], 404);
        }

        return response()->json($pet->name, 200);
    }

    /** Editar una mascota segun su id */
    public function update(Request $request, string $idPet){

        $pet = Pet::find($idPet);

        if (is_null($pet)) {
            return response()->json(['message' => 'Mascota no encontrada'], 404);
        }

        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:255',
            'species' => 'required|string|in:dog,cat',
            'gender' => 'required|string|in:male,female',
            'birthdate' => 'required|string',
            'photo' => 'required',
            'idVeterinary' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $pet->name = $request->name;
        $pet->species = $request->species;
        $pet->gender = $request->gender;
        $pet->birthdate = $request->birthdate;
        $pet->photo = $request->photo;
        $pet->idVeterinary = $request->idVeterinary;

        $pet->update();

        return response()->json('Mascota actualizada correctamente', 200);
    }

    /** eliminar una mascota segun su id */

    public function destroy(string $idPet){

        $pet = Pet::find($idPet);

        if(is_null($pet)){
            return response()->json(['message' => 'Mascota no encontrada'], 404);
        }

        $pet->active = false;
        $pet->update();

        return response()->json('Mascota eliminada correctamente', 200);
    }

    /** Eliminar todas las mascotas con el mismo id de usuario */

    public function destroyPetsByUser(string $idUser){

        $pets = Pet::where('idUser', $idUser)->get();

        if (count($pets) > 0){

            foreach ($pets as $pet){
                $pet->active = false;
                $pet->update();
            }

            return response()->json('Mascotas eliminadas correctamente', 200);

        }else{
            return response()->json(['message' => 'Mascotas no encontradas'], 404);
        }
    }
}
