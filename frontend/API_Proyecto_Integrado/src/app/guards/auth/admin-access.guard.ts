import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DatesService } from 'src/app/services/dates/dates.service';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private datesService: DatesService) { }

  canActivate(
    next: ActivatedRouteSnapshot): Observable<boolean> {

    const dateIdParam: string | null = next.paramMap.get('dateId');
    const dateId: number = Number(dateIdParam);

    return this.authService.getUser().pipe(
      switchMap(user => {
        return this.datesService.getDatesByVet(user.idVeterinary).pipe(
          map(dates => {
            const isAuthorized = dates.some((date: any) => date.idDate === dateId);
            if (isAuthorized) {
              return true;
            } else {
              this.router.navigate(['/admin']);
              return false;
            }
          })
        );
      })
    );
  }
}
