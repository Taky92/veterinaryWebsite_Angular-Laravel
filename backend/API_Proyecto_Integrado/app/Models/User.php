<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected string $guard = 'web';

    protected $table = 'users';
    protected $primaryKey = 'idUser';
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'birthdate',
        'photo',
        'active',
        'password',
    ];
    protected $hidden = [
        'password',
        'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function pets(){
        return $this->hasMany(Pet::class, 'idUser');
    }
}
