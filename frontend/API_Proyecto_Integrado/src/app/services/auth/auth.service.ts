import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, catchError, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../notifications/dialog.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = 'http://92.222.220.230:8000/api';
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _userType: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _user: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient,
    private dialogService: DialogService) {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      this._userType.next(storedUserType);
      this._isAuthenticated.next(true);
    }

  }

  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  getUserType(): Observable<string> {
    return this._userType.asObservable();
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      return this.http.get<any>(`${this.url}/user`, { headers: { Authorization: `Bearer ${token}` } })
        .pipe(
          tap((response: any) => {
            this._user.next(response.user);
          }),
          catchError(error => {
            return throwError(() => new Error('No se ha podido obtener la información del usuario'));
          })
        );
    } else {
      return throwError(() => new Error('No hay token'));
    }
  }

  handlerError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.dialogService.openErrorDialog('Usuario o contraseña incorrectos');
    } else {
      console.log(`Se ha producido un error: ${error.error}`);
    }

    return throwError(() => new Error('Algo malo ha sucedido'));
  }

  authenticateUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/user/login`, { email, password })
      .pipe(
        catchError(this.handlerError)
      );
  }

  authenticateAdmin(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.url}/admin/login`, { username, password })
      .pipe(
        catchError(this.handlerError)
      );
  }

  setAuthenticationStatusAndUser(status: boolean, user: any, userType: string, token: string) {
    if (status) {
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
    }
    this._isAuthenticated.next(status);
    this._userType.next(userType);
    this._user.next(user.user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    this._isAuthenticated.next(false);
    this._userType.next('');
    this._user.next({});
  }
}
