import { Component } from '@angular/core';
import { Pet } from 'src/app/models/pet.interface';
import { Admin } from 'src/app/models/admin.interface';
import { PetService } from 'src/app/services/pet/pet.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { DatesService } from 'src/app/services/dates/dates.service';
import { VeterinaryService } from 'src/app/services/admin/veterinary.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: any = {};
  veterinary: any = {};
  pets: Pet[] = [];

  constructor(private petService: PetService,
    public authService: AuthService,
    public vetService: VeterinaryService,
    private userService: UserService,
    private datesService: DatesService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: any) => {
      this.user = user;
      this.getPets(this.user.idUser);
    });
  }

  getPets(id: any) {
    this.petService.getPetsByUser<Pet>(id).subscribe((pets: Pet[]) => {
      if (pets.length === undefined) {
        pets = [];
      } else {
        this.pets = pets;
      }
    });
  }

  getVeterinary(id: any) {
    this.vetService.getshowVeterinary<Admin>(id).subscribe((veterinary: Admin) => {
      this.veterinary = veterinary;
    });
  }

  dropOut() {
    this.userService.delete(this.user.idUser).subscribe({
      next: () => {
        this.petService.destroyPetsByUser(this.user.idUser).subscribe();
        this.petService.getPetsByUser<Pet>(this.user.idUser).subscribe((pets: Pet[]) => {
          pets.forEach(pet => {
            this.datesService.deleteDatesByPet(pet.idPet).subscribe();
          });
        });
        this.authService.logout();
      },
      error: () => {
        console.error('Error al eliminar usuario');
      },
      complete: () => {
        this.router.navigate(['/']);      
      }
    });
  }

  editProfile(user: User) {
    this.userService.edit(this.user.idUser, user).subscribe({
      next: () => {
        this.user = { ...this.user, ...user };
      },
      error: () => {
        console.error('Error al actualizar usuario');
      }
    });
  }
}
