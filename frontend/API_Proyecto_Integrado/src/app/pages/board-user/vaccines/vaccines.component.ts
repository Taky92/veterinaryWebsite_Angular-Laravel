import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vaccine } from 'src/app/models/vaccine.inteface';
import { VaccineService } from 'src/app/services/vaccines/vaccine.service';
import { PetService } from 'src/app/services/pet/pet.service';
import { Pet } from 'src/app/models/pet.interface';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss']
})
export class VaccinesComponent implements OnInit {

  vaccineList: Vaccine[] = [];
  petName: string = '';

  constructor(private route: ActivatedRoute, private vaccineService: VaccineService, private petService: PetService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const petId = params['petId'];
      this.vaccineService.getVaccineByPet<Vaccine>(petId).subscribe(vaccine => {
        this.vaccineList = vaccine;
      });
      this.petService.getPetName<string>(petId).subscribe(pet => {
        this.petName = pet;
      });
    });
  }

  goBack(): void {
    window.history.back();
  }
}
