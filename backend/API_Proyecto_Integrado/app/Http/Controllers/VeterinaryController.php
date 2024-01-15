<?php

namespace App\Http\Controllers;

use App\Models\Veterinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VeterinaryController extends Controller
{
    /**
     * Mostar todos los veterinarios
     */
    public function index(){
        $veterinaries = Veterinary::all();

        if(count($veterinaries) == 0){
            return response()->json('No hay veterinarios', 200);
        }

        return response()->json($veterinaries);
    }

    /** mostrar los datos de una veterinario segun id **/

    public function show(string $idVeterinary){

        $veterinary = Veterinary::find($idVeterinary);

        if (is_null($veterinary)) {
            return response()->json('Veterinario no encontrado', 404);
        }

        return response()->json($veterinary);
    }

    /**
     * Mostrar el nombre y apellidos de un veterinario segun id
     */

    public function showNameVeterinary(string $idVeterinary){

        $veterinary = Veterinary::find($idVeterinary);

        if (is_null($veterinary)) {
            return response()->json('Veterinario no encontrado', 404);
        }

        return response()->json($veterinary->name . ' ' . $veterinary->surname);
    }

    /**
     * Crear un nuevo veterinario
     */

    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255| unique:veterinaries',
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'password' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $veterinary = new Veterinary();
        $veterinary->username = $request->username;
        $veterinary->name = $request->name;
        $veterinary->surname = $request->surname;
        $veterinary->password = $request->password;

        $veterinary->save();

        return response()->json('Veterinario creado correctamente', 200);
    }

}
