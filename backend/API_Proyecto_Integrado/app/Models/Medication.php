<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medication extends Model
{
    use HasFactory;

    protected $table = 'medications';

    protected $primaryKey = 'idMedication';

    public function pet(){
        return $this->belongsTo(Pet::class);
    }
}
