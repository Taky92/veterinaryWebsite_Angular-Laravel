<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
/**
 * Register User
 */

    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:255',
            'birthdate' => 'required|string|max:255',
            'photo' => 'string|max:255',
            'password' => 'required|string|min:6',
        ]);


        if($validator->fails()){
            $errors = $validator->errors();
            return response()->json($errors, 400);
        }

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'phone' => $request->phone,
            'birthdate' => $request->birthdate,
            'photo' => $request->photo,
            'password' => Hash::make($request->password),
        ]);

        //Create token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'=> $user,
            'token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    /**
     * Login User
     */

    public function userLogin(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        $guard = 'web';

        if (Auth::guard($guard)->attempt($credentials)) {

            $user = Auth::guard($guard)->user();

            if ($user->active == false) {
                return response()->json('Unauthorized', 401);
            }else{
                $token = Auth::guard($guard)->user()->createToken($guard . ' Token')->plainTextToken;
                return response()->json(['token' => $token, 'user' => Auth::guard($guard)->user()], 200);
            }

        } else {
            return response()->json('Unauthorized', 401);
        }
    }

    /**
     * Login Admin
     */

    public function adminLogin(Request $request)
    {
        $credentials = $request->only(['username', 'password']);
        $guard = 'admin';

        if (Auth::guard($guard)->attempt($credentials)) {
            $token = Auth::guard($guard)->user()->createToken($guard . ' Token')->plainTextToken;
            return response()->json(['token' => $token, 'user' => Auth::guard($guard)->user()], 200);
        } else {
            return response()->json( 'Unauthorized', 401);
        }
    }

    /**
     * Logout api
     */

    public function logout(){
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Desconnected'
        ];
    }
}
