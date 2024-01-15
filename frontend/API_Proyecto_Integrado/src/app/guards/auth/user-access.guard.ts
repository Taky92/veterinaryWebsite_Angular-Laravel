import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAccessGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {

    const userIdParam: string | null = next.paramMap.get('idUser');
    const userId: number = Number(userIdParam);

    return this.authService.getUser().pipe(
      map(user => {
        if (user.idUser === userId) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
