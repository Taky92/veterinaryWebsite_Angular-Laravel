import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  protected globalUrl = 'http://92.222.220.230:8000/api';

  constructor(protected http: HttpClient) { }

  //Muestra todos los registros de una tabla
  public index<T>(endpoint: string): Observable<T[]> {
    const url = `${this.globalUrl}/${endpoint}`;
    return this.http.get<T[]>(url);
  }

  //Muestra un registro de una tabla por su id
  public show<T>(endpoint: string, id: number): Observable<T> {
    const url = `${this.globalUrl}/${endpoint}/${id}`;
    return this.http.get<T>(url);
  }

  //Crea un registro en una tabla
  public store<T>(endpoint: string, data: T): Observable<T> {
    const url = `${this.globalUrl}/${endpoint}`;
    return this.http.post<T>(url, data);
  }

  //Actualiza un registro de una tabla
  public update<T>(endpoint: string, id: number, data: T): Observable<T> {
    const url = `${this.globalUrl}/${endpoint}/${id}`;
    return this.http.put<T>(url, data);
  }

  //Elimina un registro de una tabla
  public destroy<T>(endpoint: string, id: number): Observable<T> {
    const url = `${this.globalUrl}/${endpoint}/${id}`;
    return this.http.delete<T>(url);
  }
}
