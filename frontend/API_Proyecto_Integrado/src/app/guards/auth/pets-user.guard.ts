import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { PetService } from 'src/app/services/pet/pet.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetsUserGuard implements CanActivate {
  constructor(private router: Router, private petService: PetService, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot
  ): Observable<boolean> {

    //coger el id de la url
    const petIdParam: string | null = next.paramMap.get('petId');
    const petId: number = Number(petIdParam);

    return this.authService.getUser().pipe(
      switchMap(user => {
        if (user) {
          return this.petService.getPetsByUser(user.idUser).pipe(
            map(pets => {
              const isAuthorized = pets.some((pet: any) => pet.idPet === petId);
              if (isAuthorized) {
                return true;
              } else {
                this.router.navigate(['/']);
                return false;
              }
            })
          );
        } else {
          this.router.navigate(['/']);
          return of(false);
        }
      })
    );
  }
}
