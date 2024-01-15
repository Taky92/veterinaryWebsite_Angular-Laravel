import { Injectable } from '@angular/core';
import { CommonsService } from '../commons/commons.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends CommonsService {

  endpoint = 'reports';

  constructor(htpp: HttpClient) {
    super(htpp);
  }

  //Muestra todos los reportes de una mascota segun su id
  getReportByPet<Report>(id: number): Observable<Report[]> {
    const url = `${this.globalUrl}/${this.endpoint}/pet/${id}`;
    return this.http.get<Report[]>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Elimina un reporte segun su id
  deleteReport<Report>(id: number): Observable<Report> {
    const url = super.destroy<Report>(this.endpoint, id);
    return url
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Elimina todos los reportes de una mascota segun su id
  deleteReportsByPet<Report>(id: number): Observable<Report> {
    const url = `${this.globalUrl}/${this.endpoint}/pet/${id}`;
    return this.http.delete<Report>(url)
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  //Añade un nuevo reporte
  addReport<Report>(report: Report, file: File): Observable<Report> {
    const formData: FormData = new FormData();
    formData.append('name', (report as any).name);
    formData.append('pdf', file);
    formData.append('description', (report as any).description);
    formData.append('date', (report as any).date);
    formData.append('idPet', (report as any).idPet);

    const url = `${this.globalUrl}/${this.endpoint}`;
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<Report>(url, formData, { headers })
      .pipe(
        catchError(error => this.handlerError(error))
      );
  }

  handlerError(error: HttpErrorResponse) {
    if (error.status === 402) {
      console.log('No se han encontrado la mascota');
    } if (error.status === 404) {
      console.log('No se han encontrado informes con esa mascota');
    } else {
      console.log(`Se ha producido un error: ${error.error}`);
    }

    return throwError(() => new Error('No se han podido cargar los datos'));
  }
}
