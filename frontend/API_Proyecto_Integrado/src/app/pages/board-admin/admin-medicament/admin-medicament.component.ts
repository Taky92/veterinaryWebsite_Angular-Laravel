import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medication } from 'src/app/models/medication.inteface';
import { MedicationService } from 'src/app/services/medication/medication.service';
import { PetService } from 'src/app/services/pet/pet.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { AddMedicamentDialogComponent } from 'src/app/components/board-admin/addDialogs/add-medicament-dialog/add-medicament-dialog.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-medicament',
  templateUrl: './admin-medicament.component.html',
  styleUrls: ['./admin-medicament.component.scss']
})
export class AdminMedicamentComponent implements OnInit {

  medicationList: Medication[] = [];
  petName: string = '';
  petId: number = 0;

  constructor(private route: ActivatedRoute,
    private medicamentService: MedicationService,
    private petService: PetService,
    private dialogService: DialogService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const petId = params['petId'];
      this.petId = petId;
      this.medicamentService.getMedicationByPet<Medication>(petId).subscribe(medication => {
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

  addMedicament(): void {
    const dialogRef = this.dialog.open(AddMedicamentDialogComponent, {
      width: '600px',
      height: '600px',
      data: { idPet: this.petId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicamentService.addMedication<Medication>(result).subscribe(() => {
          this.medicamentService.getMedicationByPet<Medication[]>(this.petId).subscribe(medicaments => {
            this.medicationList = medicaments.flat();
            this.dialogService.openSuccessDialog('Medicamento añadido correctamente');
          });
        });
      }
    });
  }

}
