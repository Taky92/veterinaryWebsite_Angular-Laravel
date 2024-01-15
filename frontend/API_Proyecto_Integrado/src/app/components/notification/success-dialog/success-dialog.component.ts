import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss']
})
export class SuccessDialogComponent {
  message: string;
  onConfirm: EventEmitter<void> = new EventEmitter<void>();
  onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.message = data.message;
  }
}
