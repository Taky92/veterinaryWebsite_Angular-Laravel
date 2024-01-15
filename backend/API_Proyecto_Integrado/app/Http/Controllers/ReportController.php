<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
    /**
     * Muestra todos los informes de una mascota según su id
     */
    public function showAllReportByPet( string $idPet ){

        $pet = Pet::find($idPet);

        if($pet){

            $reports = Report::where('idPet', $idPet)->where('active', true)->get();

            if (count($reports)>0){
                return response()->json($reports, 200);

            }else{
                return response()->json(['message' => 'No se han encontrado informes'], 200);
            }

        }

        return response()->json(['message' => 'Mascota no encontrada'], 402);

    }

    /**
     * Añadir informe nuevo a una mascota.
     * @csrf_exempt
     */
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'pdf' => 'required|file|mimes:pdf|max:2048',
            'description' => 'required|string|max:255',
            'date' => 'required|string',
            'idPet' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors(), 'request_data' => $request->all()], 400);
        }

        $pdfPath = $request->file('pdf')->storeAs('pdfs', $request->file('pdf')->getClientOriginalName(), 'public');

        $report = new Report();
        $report->name = $request->name;
        $report->pdf = str_replace('pdfs/', '', $pdfPath);
        $report->description = $request->description;
        $report->date = $request->date;
        $report->idPet = $request->idPet;

        $report->save();

        return response()->json($report, 200);
    }

    /**
     * Eliminar informe según su id
     */
    public function destroy(string $idReport){

        $report = Report::find($idReport);

        if($report){
            $report->active = false;
            $report->update();
            return response()->json(['message' => 'Informe eliminado correctamente'], 200);
        }

        return response()->json(['message' => 'Informe no encontrado'], 404);
    }

    /**
     * Eliminar todos los informes de una mascota según su id
     */

    public function destroyReportsByPet(string $idPet)
    {

        $reports = Report::where('idPet', $idPet)->get();

        if ($reports) {
            foreach ($reports as $report) {
                $report->active = false;
                $report->update();
            }
            return response()->json(['message' => 'Informes eliminados correctamente'], 200);
        }

        return response()->json(['message' => 'Informes no encontrados'], 404);
    }

}
