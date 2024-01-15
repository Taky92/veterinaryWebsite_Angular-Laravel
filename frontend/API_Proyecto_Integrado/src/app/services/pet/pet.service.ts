import { Injectable } from '@angular/core';
import { CommonsService } from '../commons/commons.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService extends CommonsService {

  endpoint = 'pets';

  constructor(http: HttpClient) {
    super(http);
  }

  //Muestra todas las mascotas
  getPets<Pet>(): Observable<Pet[]> {
    return super.index(this.endpoint);
  }

  //Muestra la mascota segun el id
  getshowPet<Pet>(id: number): Observable<Pet> {
    return super.show<Pet>(this.endpoint, id)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Muestra todas las mascotas de un usuario segun el id
  getPetsByUser<Pet>(id: number): Observable<Pet[]> {
    const url = `${this.globalUrl}/${this.endpoint}/user/${id}`;
    return this.http.get<Pet[]>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Muestra todas las mascotas de un veterinario segun el id
  getPetsByVet<Pet>(id: number): Observable<Pet[]> {
    const url = `${this.globalUrl}/${this.endpoint}/vet/${id}`;
    return this.http.get<Pet[]>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Muestra el nombre de la mascota segun el id
  getPetName<Pet>(id: number): Observable<Pet> {
    const url = `${this.globalUrl}/${this.endpoint}/name/${id}`;
    return this.http.get<Pet>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Crea una mascota nueva
  storePet<Pet>(data: Pet): Observable<Pet> {
    const url = super.store(this.endpoint, data);
    return url
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Actualiza una mascota
  updatePet<Pet>(id: number, data: Pet): Observable<Pet> {
    const url = super.update(this.endpoint, id, data);
    return url
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Elimina una mascota
  destroyPet<Pet>(id: number): Observable<Pet> {
    return super.destroy<Pet>(this.endpoint, id)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Elimina todas las mascotas de un usuario
  destroyPetsByUser<Pet>(id: number): Observable<Pet> {
    const url = `${this.globalUrl}/${this.endpoint}/user/${id}`;
    return this.http.delete<Pet>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  handlerError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.log('No se han encontrado mascotas');
    } if (error.status === 402) {
      console.log('No se ha encontrado el usuario');
    } else {
      console.log(`Se ha producido un error: ${error.error}`);
    }

    return throwError(() => new Error('No se han podido cargar los datos'));
  }
}
