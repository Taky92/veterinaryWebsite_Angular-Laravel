import { Component, Input, OnInit } from '@angular/core';
import { VeterinaryService } from 'src/app/services/admin/veterinary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-pet',
  templateUrl: './card-pet.component.html',
  styleUrls: ['./card-pet.component.scss']
})
export class CardPetComponent implements OnInit {

  @Input() pet: any = {};

  constructor(public vetService: VeterinaryService, private router: Router) { }

  ngOnInit(): void {
    this.vetService.getshowVeterinaryName(this.pet.idVeterinary).subscribe((vetName) => {
      this.pet.veterinary = vetName;
    });
  }

  goToMedicaments(petId: number) {
    this.router.navigate(['/user/medicaments/', petId]);
  }

  goToVaccines(petId: number) {
    this.router.navigate(['/user/vaccines/', petId]);
  }

  goToReports(petId: number) {
    this.router.navigate(['/user/reports/', petId]);
  }
}
