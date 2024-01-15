import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatesService } from 'src/app/services/dates/dates.service';
import { PetService } from 'src/app/services/pet/pet.service';
import { UserService } from 'src/app/services/user/user.service';
import { Dates } from 'src/app/models/dates.interface';
import { User } from 'src/app/models/user.interface';
import { Pet } from 'src/app/models/pet.interface';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-date-details',
  templateUrl: './date-details.component.html',
  styleUrls: ['./date-details.component.scss']
})
export class DateDetailsComponent implements OnInit {

  date: Dates = {} as Dates;
  user: User = {} as User;
  pet: Pet = {} as Pet;

  constructor(private activedRoute: ActivatedRoute,
    private datesService: DatesService,
    private userService: UserService,
    private petService: PetService,
    private router: Router) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      const id = params['dateId'];
      this.datesService.getDateById(id).subscribe(date => {
        this.date = date;
        this.petService.getshowPet<Pet>(date.idPet).subscribe(pet => {
          this.pet = pet;
          this.userService.showUser(pet.idUser).subscribe(user => {
            this.user = user;
          });
        });
      });
    });
  }

  addPet(pet: Pet) {
    this.petService.storePet<Pet>(pet).subscribe(
      {
        next: (res) => {
          console.log('Mascota creada', res);
        },
        error: (err) => console.log(err)
      });
  }

  updatePet(pet: Pet) {
    this.petService.updatePet<Pet>(this.pet.idPet, pet).subscribe(
      {
        next: (res) => {
          this.pet = { ...this.pet, ...pet };
        },
        error: (err) => console.log(err)
      });
  }

  deletePet() {

    forkJoin([
      this.petService.destroyPet(this.pet.idPet),
      this.datesService.deleteDatesByPet(this.pet.idPet),
    ]).subscribe({
      next: (res) => {
        this.router.navigate(['/admin']);
      },
      error: (err) => console.log(err)
    });

  }

  goBack() {
    window.history.back();
  }
}
