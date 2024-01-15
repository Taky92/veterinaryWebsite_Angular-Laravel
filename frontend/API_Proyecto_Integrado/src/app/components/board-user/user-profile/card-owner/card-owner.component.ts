import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-owner',
  templateUrl: './card-owner.component.html',
  styleUrls: ['./card-owner.component.scss']
})
export class CardOwnerComponent {

  @Input() user = {} as User;
  @Output() dropOutClick: EventEmitter<number> = new EventEmitter<number>();
  @Output() editProfileClick: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService
  ) { }

  onDropOutClick() {
    this.dialogService.openConfirmDialog('¿Estás seguro de que quieres darte de baja?')
      .subscribe(result => {
        if (result) {
          this.dropOutClick.emit();
        }
      }
      );
  }

  onEditProfileClick() {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '600px',
      height: '700px',
      data: { user: { ...this.user } }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editProfileClick.emit(result);
        this.dialogService.openSuccessDialog('Perfil actualizado correctamente');
      }
    });
  }

  goToDates(idUser: number) {
    this.router.navigate(['/user/dates/', idUser]);
  }
}
