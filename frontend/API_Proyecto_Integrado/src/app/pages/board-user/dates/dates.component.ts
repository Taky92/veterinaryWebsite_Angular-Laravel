import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.interface';
import { PetService } from 'src/app/services/pet/pet.service';
import { DatesService } from 'src/app/services/dates/dates.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent implements OnInit {

  pets: Pet[] = [];
  petsWithDates: Pet[] = [];

  constructor(private petService: PetService, private route: ActivatedRoute, private datesService: DatesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idUser = params[`idUser`];

      this.petService.getPetsByUser<Pet>(idUser).subscribe(pets => {
        if (pets.length === undefined) {
          pets = [];
        } else {
          this.pets = pets;
          this.filterPetsWithDates();
        }
      });
    });
  }

  onDateAdded(event: boolean) {

    if (event) {
      this.pets.forEach(pet => {
        const isPetWithDate = this.petsWithDates.some(existingPet => existingPet.idPet === pet.idPet);
        if (!isPetWithDate) {
          this.datesService.getDatesByPet(pet.idPet).subscribe(dates => {
            if (dates && dates.length > 0) {
              this.petsWithDates.push(pet);
            }
          });
        }
      });
    }
  }

  onDateDeleted(deletedPetId: number) {
    this.petsWithDates = this.petsWithDates.filter(pet => pet.idPet !== deletedPetId);
  }

  filterPetsWithDates(): void {
    const petsWithDates: Pet[] = [];
    this.pets.forEach(pet => {
      this.datesService.getDatesByPet(pet.idPet).subscribe(dates => {
        if (dates && dates.length > 0) {
          petsWithDates.push(pet);
        }
      });
    });
    this.petsWithDates = petsWithDates;
  }

  goBack(): void {
    window.history.back();
  }

}
