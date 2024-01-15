import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medication } from 'src/app/models/medication.inteface';
import { MedicationService } from 'src/app/services/medication/medication.service';
import { PetService } from 'src/app/services/pet/pet.service';

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.scss']
})
export class MedicamentsComponent implements OnInit {

  medicationList: Medication[] = [];
  petName: string = '';

  constructor(private route: ActivatedRoute, private medicationService: MedicationService, private petService: PetService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const petId = params['petId'];
      this.medicationService.getMedicationByPet<Medication>(petId).subscribe(medication => {
        this.medicationList = medication;
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
