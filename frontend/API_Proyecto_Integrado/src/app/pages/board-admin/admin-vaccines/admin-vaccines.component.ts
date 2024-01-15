import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vaccine } from 'src/app/models/vaccine.inteface';
import { VaccineService } from 'src/app/services/vaccines/vaccine.service';
import { PetService } from 'src/app/services/pet/pet.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { AddVaccineDialogComponent } from 'src/app/components/board-admin/addDialogs/add-vaccine-dialog/add-vaccine-dialog.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-vaccines',
  templateUrl: './admin-vaccines.component.html',
  styleUrls: ['./admin-vaccines.component.scss']
})
export class AdminVaccinesComponent implements OnInit {

  vaccineList: Vaccine[] = [];
  petName: string = '';
  petId: number = 0;

  constructor(private route: ActivatedRoute,
    private vaccineService: VaccineService,
    private petService: PetService,
    private dialogService: DialogService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const petId = params['petId'];
      this.petId = petId;
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

  addVaccine(): void {
    const dialogRef = this.dialog.open(AddVaccineDialogComponent, {
      width: '600px',
      height: '500px',
      data: { idPet: this.petId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.vaccineService.addVaccine<Vaccine>(result).subscribe(() => {
          this.vaccineService.getVaccineByPet<Vaccine[]>(this.petId).subscribe(vaccines => {
            this.vaccineList = vaccines.flat();
            this.dialogService.openSuccessDialog('Vacuna añadida correctamente');
          });
        });
      }
    });
  }

}
