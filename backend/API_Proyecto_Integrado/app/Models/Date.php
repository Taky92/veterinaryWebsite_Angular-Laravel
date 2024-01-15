<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
    use HasFactory;

    protected $table = 'dates';

    protected $primaryKey = 'idDate';

    public function veterinary(){
        return $this->belongsTo(Veterinary::class);
    }

    public function pet(){
        return $this->belongsTo(Pet::class, 'idPet');
    }
}
