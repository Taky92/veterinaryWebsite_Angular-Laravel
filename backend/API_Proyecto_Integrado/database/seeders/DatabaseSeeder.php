<?php

namespace Database\Seeders;

use App\Models\Date;
use App\Models\Medication;
use App\Models\Pet;
use App\Models\Report;
use App\Models\User;
use App\Models\Vaccine;
use App\Models\Veterinary;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    private $petSeeder = array(
        array(
            'name' => 'Kero',
            'species' => 'dog',
            'gender' => 'male',
            'birthdate' => '01/01/2011',
            'photo' => 'pet.png',
            'idUser' => 1,
            'idVeterinary' => 1,
        ),
        array(
            'name' => 'Arya',
            'species' => 'dog',
            'gender' => 'female',
            'birthdate' => '01/01/2011',
            'photo' => 'pet.png',
            'idUser' => 4,
            'idVeterinary' => 1,
        ),
        array(
            'name' => 'Deco',
            'species' => 'dog',
            'gender' => 'male',
            'birthdate' => '11/10/2018',
            'photo' => 'pet.png',
            'idUser' => 2,
            'idVeterinary' => 1,
        ),
        array(
            'name' => 'Toby',
            'species' => 'dog',
            'gender' => 'male',
            'birthdate' => '01/03/2013',
            'photo' => 'pet.png',
            'idUser' => 3,
            'idVeterinary' => 2,
        ),
        array(
            'name' => 'Roni',
            'species' => 'dog',
            'gender' => 'male',
            'birthdate' => '15/12/2018',
            'photo' => 'pet.png',
            'idUser' => 1,
            'idVeterinary' => 2,
        ),
        array(
            'name' => 'Firulais',
            'species' => 'dog',
            'gender' => 'male',
            'birthdate' => '01/01/2001',
            'photo' => 'pet.png',
            'idUser' => 5,
            'idVeterinary' => 1,
        ),
        array(
            'name' => 'Kitty',
            'species' => 'cat',
            'gender' => 'female',
            'birthdate' => '01/01/2011',
            'photo' => 'pet.png',
            'idUser' => 5,
            'idVeterinary' => 1,
        )
    );

    private $userSeeder = array(
        array(
            'name' => 'Tania',
            'surname' => 'Rodriguez',
            'email' => 'tania@gmail.com',
            'phone' => '665411362',
            'birthdate' => '26/01/1992',
            'photo' => 'user.png',
            'password' => '260192',
        ),
        array(
            'name' => 'Jaime',
            'surname' => 'Toledano',
            'email' => 'jaime@gmail.com',
            'phone' => '656321456',
            'birthdate' => '25/06/2002',
            'photo' => 'user.png',
            'password' => '250602',
        ),
        array(
            'name' => 'Ana Maria',
            'surname' => 'Caro',
            'email' => 'ana@gmail.com',
            'phone' => '665393822',
            'birthdate' => '26/10/1971',
            'photo' => 'user.png',
            'password' => '261071',
        ),
        array(
            'name' => 'Sara',
            'surname' => 'Dominguez',
            'email' => 'sara@gmail.com',
            'phone' => '632145789',
            'birthdate' => '30/12/1994',
            'photo' => 'user.png',
            'password' => '301294',
        ),
        array(
            'name' => 'user',
            'surname' => 'user',
            'email' => 'user@gmail.com',
            'phone' => '666666666',
            'birthdate' => '01/01/2000',
            'photo' => 'user.png',
            'password' => '123456',
        ),
    );

    private $veterinarySeeder = array(
        array(
            'username' => 'lorena',
            'name' => 'Lorena',
            'surname' => 'Gonzalez',
            'password' =>'2222'
        ),
        array(
            'username' => 'takotika',
            'name' => 'Zaira',
            'surname' => 'Rodriguez',
            'password' =>'1110'
        ),
        array(
            'username' => 'Ewi',
            'name' => 'Eduardo',
            'surname' => 'Bermudez',
            'password' =>'8522'
        ),
    );

    public function run(): void
    {

        foreach ($this->userSeeder as $user) {
            User::factory(1)->create($user);
        }

        foreach ($this->veterinarySeeder as $veterinary) {
            Veterinary::factory(1)->create($veterinary);
        }

        foreach ($this->petSeeder as $pet) {
            Pet::factory(1)->create($pet);
        }

        Report::factory(30)->create();
        Vaccine::factory(30)->create();
        Medication::factory(30)->create();
        Date::factory(6)->create();




//        $this->call(VeterinarySeeder::class);
//        $this->call(UserSeeder::class);
//        $this->call(PetSeeder::class);
//
//        Report::factory(30)->create();
//        Vaccine::factory(30)->create();
//        Medication::factory(30)->create();
//        Date::factory(6)->create();

    }


}
