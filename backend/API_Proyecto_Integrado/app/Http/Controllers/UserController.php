<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Mostrar todos los usuarios.
     */
    public function index(){

        $users = User::where('active', true)->get();

        return response()->json($users);
    }

    /**
     * Mostrar los datos de un usuario a partir del teléfono.
     */

    public function showUserByPhone(string $phone){

        $user = User::where('phone', $phone)->where('active', true)->first();

        if (is_null($user)) {
            return response()->json($user, 200);
        }

        return response()->json($user, 200);
    }

    /**
     * Añadir un usuario.
     */
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => ['required','integer', 'unique:users', 'min:9'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'birthdate' => 'required|string',
            'photo' => 'required|string',
            'password' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = new User();
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->birthdate = $request->birthdate;
        $user->photo = $request->photo;
        $user->password = $request->password;

        $user->save();

        return response()->json('Usuario creado correctamente', 200);
    }

    /**
     * mostrar los datos de un usuario segun su id
     */
    public function show(string $id){
        $user = User::where('idUser', $id)->where('active', true)->first();

        if (is_null($user)) {
            return response()->json('Usuario no encontrado', 404);
        }

        return response()->json($user);
    }

    /**
     * Actualizar los datos de un usuario segun su id
     */
    public function update(Request $request, string $id){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => ['required','integer', Rule::unique('users')->ignore($id, 'idUser'), 'min:9'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($id, 'idUser')],
            'birthdate' => 'required|string',
            'photo' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::find($id);

        if (is_null($user)) {
            return response()->json('Usuario no encontrado', 404);
        }
            $user->name = $request->name;
            $user->surname = $request->surname;
            $user->phone = $request->phone;
            $user->email = $request->email;
            $user->birthdate = $request->birthdate;
            $user->photo = $request->photo;

            $user->update();

        return response()->json('Usuario actualizado correctamente', 200);
    }

    /**
     * Eliminar un usuario segun su id.
     */
    public function destroy($id){

        $user = User::find($id);

        if (is_null($user)) {
            return response()->json('Usuario no encontrado', 404);
        }

        $user->active = false;
        $user->update();

        return response()->json('Usuario eliminado correctamente', 200);



    }
}
