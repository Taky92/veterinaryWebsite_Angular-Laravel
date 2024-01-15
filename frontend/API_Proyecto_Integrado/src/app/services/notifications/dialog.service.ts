import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/notification/confirm-dialog/confirm-dialog.component';
import { ErrorAuthDialogComponent } from 'src/app/components/notification/error-auth-dialog/error-auth-dialog.component';
import { SuccessDialogComponent } from 'src/app/components/notification/success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(message: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { message }
    }).afterClosed();
  }

  openErrorDialog(message: string) {
    return this.dialog.open(ErrorAuthDialogComponent, {
      data: { message }
    }).afterClosed();
  }

  openSuccessDialog(message: string) {
    return this.dialog.open(SuccessDialogComponent, {
      width: '400px',
      data: { message }
    }).afterClosed();
  }


}
