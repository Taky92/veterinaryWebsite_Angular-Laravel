import { Injectable } from '@angular/core';
import { CommonsService } from '../commons/commons.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonsService {

  endpoint = 'users';

  constructor(http: HttpClient) {
    super(http);
  }

  //Eliminar al usuario por su id
  public delete(id: number) {
    return this.destroy(this.endpoint, id)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Actualizar los datos del usuario por su id
  public edit(id: number, user: User) {
    return this.update(this.endpoint, id, user)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Obtener los datos de un usuario por su id
  public showUser(id: number): Observable<User> {
    return this.show<User>(this.endpoint, id)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Obtener de un usuario por su telefono
  public getUserByPhone(phone: number): Observable<User> {
    const url = `${this.globalUrl}/${this.endpoint}/phone/${phone}`;
    return this.http.get<User>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Obtener todos los usuarios
  public getUsers(): Observable<User[]> {
    return super.index<User>(this.endpoint)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  handlerError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.log('Usuario no encontrado');
    } else {
      console.log(`Se ha producido un error: ${error.error}`);
    }

    return throwError(() => new Error('No se han podido cargar los datos'));
  }

}
