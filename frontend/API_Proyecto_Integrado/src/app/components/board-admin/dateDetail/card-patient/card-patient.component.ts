import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { UpdatePetDialogComponent } from 'src/app/components/board-admin/dateDetail/update-pet-dialog/update-pet-dialog.component';
import { Dates } from 'src/app/models/dates.interface';
import { Pet } from 'src/app/models/pet.interface';

@Component({
  selector: 'app-card-patient',
  templateUrl: './card-patient.component.html',
  styleUrls: ['./card-patient.component.scss']
})
export class CardPatientComponent {

  @Input() pet: Pet = {} as Pet;
  @Input() date: Dates = {} as Dates;
  @Output() updatePetClick: EventEmitter<Pet> = new EventEmitter<Pet>();
  @Output() deletePetClick: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

  onUpdatePet(): void {
    const dialogRef = this.dialog.open(UpdatePetDialogComponent, {
      width: '600px',
      height: '800px',
      data: { pet: { ...this.pet } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updatePetClick.emit(result);
        this.dialogService.openSuccessDialog('Mascota actualizada correctamente');
      }
    });
  }

  onDeletePet(): void {
    this.dialogService.openConfirmDialog('¿Está seguro que desea eliminar la mascota?')
      .subscribe((response) => {
        if (response) {
          this.deletePetClick.emit(this.pet.idVeterinary);
          this.dialogService.openSuccessDialog('Mascota eliminada correctamente');
        }
      });
  }

}
