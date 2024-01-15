import { Injectable } from '@angular/core';
import { CommonsService } from '../commons/commons.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError, tap } from 'rxjs';
import { format } from 'date-fns';
import { Dates } from 'src/app/models/dates.interface';

@Injectable({
  providedIn: 'root',

})
export class DatesService extends CommonsService {

  endpoint = 'dates';

  constructor(http: HttpClient) {
    super(http);
  }

  handlerError(error: HttpErrorResponse) {
    if (error.status === 402) {
      console.log('No se ha encontrado la mascota');
    } if (error.status === 403) {
      console.log('No se ha encontrado el veterinario');
    } else {
      console.log(`Se ha producido un error: ${error.error}`);
      console.log(`Se ha producido un error: ${error.message}`);
    }

    return throwError(() => new Error('No se han podido cargar los datos'));
  }

  //Mostrar las citas de una mascota
  getDatesByPet(id: number): Observable<any> {
    const url = `${this.globalUrl}/${this.endpoint}/pet/${id}`;
    return this.http.get<Date>(url)
      .pipe(
        catchError(this.handlerError)
      );
  }

  //Mostrar las citas de un veterinario
  getDatesByVet(id: number): Observable<any> {
    const url = `${this.globalUrl}/${this.endpoint}/vet/${id}`;
    return this.http.get<Dates[]>(url)
      .pipe(
        catchError(this.handlerError)
      );
  }

  //Mostrar los datos de una cita según su id
  getDateById(id: number): Observable<Dates> {
    const url = `${this.globalUrl}/${this.endpoint}/${id}`;
    return this.http.get<Dates>(url).pipe(
      catchError(this.handlerError)
    );
  }

  //Mostrar las citas ocupadas de un veterinario en un día
  getHoursDatesByVet(id: number, date: Date): Observable<any> {

    const formattedDate = format(date, 'dd-MM-yyyy');

    const url = `${this.globalUrl}/${this.endpoint}/vet/${id}/${formattedDate}`;
    return this.http.get<string[]>(url)
      .pipe(
        catchError(this.handlerError)
      );
  }

  //Añadir una cita
  addDate(date: any): Observable<any> {
    const url = `${this.globalUrl}/${this.endpoint}`;
    return this.http.post<Dates>(url, date)
      .pipe(
        catchError(this.handlerError)
      );
  }

  //Eliminar una cita
  deleteDate(id: number): Observable<any> {
    const url = `${this.globalUrl}/${this.endpoint}/${id}`;
    return this.http.delete<Dates>(url)
      .pipe(
        catchError(this.handlerError)
      );
  }

  //Eliminar todas las citas de una mascota
  deleteDatesByPet(id: number): Observable<any> {
    const url = `${this.globalUrl}/${this.endpoint}/pet/${id}`;
    return this.http.delete<Dates>(url)
      .pipe(
        catchError(this.handlerError)
      );
  }

}
