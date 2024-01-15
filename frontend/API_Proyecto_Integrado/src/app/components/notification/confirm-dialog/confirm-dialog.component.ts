import { Component, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  message: string;
  onConfirm: EventEmitter<void> = new EventEmitter<void>();
  onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.message = data.message;
  }

  confirm() {
    this.onConfirm.emit();
    this.dialogRef.close(true);
  }

  cancel() {
    this.onCancel.emit();
    this.dialogRef.close(false);
  }
}
