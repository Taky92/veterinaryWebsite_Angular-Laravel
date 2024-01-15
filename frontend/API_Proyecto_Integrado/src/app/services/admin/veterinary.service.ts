import { Injectable } from '@angular/core';
import { CommonsService } from '../commons/commons.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { Admin } from 'src/app/models/admin.interface';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService extends CommonsService {

  endpoint = 'veterinaries';

  constructor(http: HttpClient) {
    super(http);
  }

  handlerError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.log('No se han encontrado el veterinario');
    } else {
      console.log(`Se ha producido un error: ${error.error}`);
    }

    return throwError(() => new Error('No se han podido cargar los datos'));
  }

  //Muestra el veterinario segun el id
  getshowVeterinary<Admin>(id: number): Observable<Admin> {
    return super.show(this.endpoint, id);
  }

  //Muestra el nombre completo del veterinario segun el id
  getshowVeterinaryName<Admin>(id: number): Observable<Admin> {
    const url = `${this.globalUrl}/${this.endpoint}/name/${id}`;
    return this.http.get<Admin>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Muestra todos los veterinarios
  getVeterinaries<Admin>(): Observable<Admin[]> {
    const url = super.index<Admin>(this.endpoint);
    return url;
  }


}
