import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-medicament-dialog',
  templateUrl: './add-medicament-dialog.component.html',
  styleUrls: ['./add-medicament-dialog.component.scss']
})
export class AddMedicamentDialogComponent implements OnInit {

  addMedicamentForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<AddMedicamentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addMedicamentForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      treatment: ['', Validators.required],
    });

    this.addMedicamentForm.get('startDate')?.valueChanges.subscribe(() => {
      this.validateDates();
    });

    this.addMedicamentForm.get('endDate')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
  }

  validateDates(): void {
    const startDate = this.addMedicamentForm.get('startDate')?.value;
    const endDate = this.addMedicamentForm.get('endDate')?.value;
    if (startDate && endDate && startDate > endDate) {
      this.addMedicamentForm.get('endDate')?.setErrors({ 'dateError': true });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAddMedicament(): void {
    const startDate = this.addMedicamentForm.get('startDate')?.value;
    const endDate = this.addMedicamentForm.get('endDate')?.value;
    const startDateFormatted = format(startDate, 'dd/MM/yyyy');
    const endDateFormatted = format(endDate, 'dd/MM/yyyy');

    if (this.addMedicamentForm.valid) {
      const newMedicament = {
        name: this.addMedicamentForm.value.name,
        start_date: startDateFormatted,
        end_date: endDateFormatted,
        treatment: this.addMedicamentForm.value.treatment,
        idPet: this.data.idPet,
      };
      this.dialogRef.close(newMedicament);
    }
  }

  get name() { return this.addMedicamentForm.get('name'); }

  get startDate() { return this.addMedicamentForm.get('startDate'); }

  get endDate() { return this.addMedicamentForm.get('endDate'); }

  get treatment() { return this.addMedicamentForm.get('description'); }

  get photo() { return this.addMedicamentForm.get('photo'); }

}
