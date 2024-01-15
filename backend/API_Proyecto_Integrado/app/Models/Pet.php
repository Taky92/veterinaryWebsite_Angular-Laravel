<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $table = 'pets';

    protected $primaryKey = 'idPet';

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function veterinary(){
        return $this->belongsTo(Veterinary::class);
    }

    public function dates(){
        return $this->hasMany(Date::class, 'idPet');
    }

    public function reports(){
        return $this->hasMany(Report::class, 'idPet');
    }

    public function medications(){
        return $this->hasMany(Medication::class, 'idPet');
    }

    public function vaccines(){
        return $this->hasMany(Vaccine::class, 'idPet');
    }
}
