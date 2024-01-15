import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { Pet } from 'src/app/models/pet.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddPetDialogComponent } from '../add-pet-dialog/add-pet-dialog.component';
import { DialogService } from 'src/app/services/notifications/dialog.service';

@Component({
  selector: 'app-card-user',
  templateUrl: './card-user.component.html',
  styleUrls: ['./card-user.component.scss']
})
export class CardUserComponent {

  @Input() user: User = {} as User;
  @Output() addPetClick: EventEmitter<Pet> = new EventEmitter<Pet>();

  constructor(private dialog: MatDialog,
    private dialogService: DialogService
  ) { }


  onAddPet(id: number) {
    const dialogRef = this.dialog.open(AddPetDialogComponent, {
      width: '600px',
      height: '750px',
      data: { idUser: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPetClick.emit(result);
        this.dialogService.openSuccessDialog('Mascota añadida correctamente');
      }
    });
  }
}
