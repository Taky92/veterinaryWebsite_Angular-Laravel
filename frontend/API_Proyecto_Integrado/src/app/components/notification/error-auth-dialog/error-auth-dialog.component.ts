import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-auth-dialog',
  templateUrl: './error-auth-dialog.component.html',
  styleUrls: ['./error-auth-dialog.component.scss']
})
export class ErrorAuthDialogComponent {

  errorMessage: string;

  constructor(
    private dialogRef: MatDialogRef<ErrorAuthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.errorMessage = data.message;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}
