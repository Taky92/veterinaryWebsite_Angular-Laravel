import { Injectable } from '@angular/core';
import { CommonsService } from '../commons/commons.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends CommonsService {

  endpoint = 'medications';

  constructor(http: HttpClient) {
    super(http);
  }

  //Muestra todos los medicamentos de una mascota segun su id
  getMedicationByPet<Medication>(id: number): Observable<Medication[]> {
    const url = `${this.globalUrl}/${this.endpoint}/pet/${id}`;
    return this.http.get<Medication[]>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Elimina un medicamento segun su id
  deleteMedication<Medication>(id: number): Observable<Medication> {
    const url = super.destroy<Medication>(this.endpoint, id);
    return url
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Añade un nuevo medicamento
  addMedication<Medication>(medication: Medication): Observable<Medication> {
    const url = super.store<Medication>(this.endpoint, medication);
    return url
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Elimina todos los medicamentos de una mascota segun su id
  deleteMedicationsByPet<Medication>(id: number): Observable<Medication> {
    const url = `${this.globalUrl}/${this.endpoint}/pet/${id}`;
    return this.http.delete<Medication>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }


  handlerError(error: HttpErrorResponse) {
    if (error.status === 402) {
      console.log('No se han encontrado la mascota');
    } if (error.status === 404) {
      console.log('No se han encontrado medicinas con esa mascota');
    } else {
      console.log(`Se ha producido un error: ${error.error}`);
    }

    return throwError(() => new Error('No se han podido cargar los datos'));
  }
}
