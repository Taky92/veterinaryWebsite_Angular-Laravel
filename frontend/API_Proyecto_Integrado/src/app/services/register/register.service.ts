import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/user.interface';
import { DialogService } from '../notifications/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url: string = 'http://92.222.220.230:8000/api';

  constructor(private http: HttpClient, private dialogService: DialogService) { }

  handlerError(error: HttpErrorResponse) {

    if (error.status === 400) {
      this.openErrorDialog(`El telefono o el email ya existen en la base de datos`);

    } else {
      console.log(`Se ha producido un error: ${error.error}`);
    }

    return throwError(() => new Error('Algo malo ha sucedido'));
  }

  openErrorDialog(errorMessage: string): void {
    const dialogRef = this.dialogService.openErrorDialog(errorMessage);
  }

  registerUser(data: User): Observable<any> {
    return this.http.post(`${this.url}/user/register`, data)
      .pipe(
        catchError(this.handlerError));
  }
}
