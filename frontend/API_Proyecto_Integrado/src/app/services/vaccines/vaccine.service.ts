import { Injectable } from '@angular/core';
import { CommonsService } from '../commons/commons.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccineService extends CommonsService {

  endpoint = 'vaccines';

  constructor(http: HttpClient) { 
    super(http);
  }

  //Muestra todas las vacunas de una mascota segun su id
  getVaccineByPet<Vaccine>(id: number): Observable<Vaccine[]> {
    const url = `${this.globalUrl}/${this.endpoint}/pet/${id}`;
    return this.http.get<Vaccine[]>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Elimina una vacuna segun su id
  deleteVaccine<Vaccine>(id: number): Observable<Vaccine> {
    const url = super.destroy<Vaccine>(this.endpoint, id);
    return url
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Elimina todas las vacunas de una mascota segun su id
  deleteVaccinesByPet<Vaccine>(id: number): Observable<Vaccine> {
    const url = `${this.globalUrl}/${this.endpoint}/pet/${id}`;
    return this.http.delete<Vaccine>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Añade una vacuna
  addVaccine<Vaccine>(vaccine: Vaccine): Observable<Vaccine> {
    const url = super.store<Vaccine>(this.endpoint, vaccine);
    return url
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  handlerError(error: HttpErrorResponse) {
    if (error.status === 402) {
      console.log('No se han encontrado la mascota');
    }if(error.status === 404){
      console.log('No se han encontrado vacunas con esa mascota');
    } else {
      console.log(`Se ha producido un error: ${error.error}`);
    }

    return throwError(() => new Error('No se han podido cargar los datos'));
  }
}
