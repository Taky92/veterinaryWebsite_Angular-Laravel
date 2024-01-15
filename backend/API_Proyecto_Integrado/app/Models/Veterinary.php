<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Veterinary extends Authenticatable
{
    use HasApiTokens, Notifiable, HasFactory;
    protected string $guard = 'admin';

    protected $table = 'veterinaries';

    protected $primaryKey = 'idVeterinary';

    protected $fillable = [
        'username',
        'name',
        'surname',
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
        return $this->hasMany(Pet::class, 'idVeterinary');
    }

    public function dates(){
        return $this->hasMany(Date::class, 'idVeterinary');
    }
}
