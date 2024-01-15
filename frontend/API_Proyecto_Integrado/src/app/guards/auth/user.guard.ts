import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {

    return this.authService.getUserType().pipe(
      map(userType => {

        if (userType === 'user') {
          return true;

        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }));
  }

}
