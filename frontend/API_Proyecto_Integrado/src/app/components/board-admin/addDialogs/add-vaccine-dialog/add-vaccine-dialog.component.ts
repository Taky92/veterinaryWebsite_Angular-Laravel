import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-vaccine-dialog',
  templateUrl: './add-vaccine-dialog.component.html',
  styleUrls: ['./add-vaccine-dialog.component.scss']
})
export class AddVaccineDialogComponent implements OnInit{

  addVaccineForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<AddVaccineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    this.addVaccineForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      expirationDate: ['', Validators.required]
    });

    this.addVaccineForm.get('date')?.valueChanges.subscribe(() => {
      this.validateDates();
    });

    this.addVaccineForm.get('expirationDate')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
  }

  validateDates(): void {
    const date = this.addVaccineForm.get('date')?.value;
    const expirationDate = this.addVaccineForm.get('expirationDate')?.value;
    if (date && expirationDate && date > expirationDate) {
      this.addVaccineForm.get('expirationDate')?.setErrors({ 'dateError': true });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAddVaccine(){
    const date = this.addVaccineForm.get('date')?.value;
    const expirationDate = this.addVaccineForm.get('expirationDate')?.value;
    const dateFormatted = format(date, 'dd/MM/yyyy');
    const expirationDateFormatted = format(expirationDate, 'dd/MM/yyyy');

    if (this.addVaccineForm.valid) {
      const newVaccine = {
        name: this.addVaccineForm.value.name,
        date: dateFormatted,
        expiration: expirationDateFormatted,
        idPet: this.data.idPet
      };
      this.dialogRef.close(newVaccine);
    }
  }

  get name() { return this.addVaccineForm.get('name'); }

  get date() { return this.addVaccineForm.get('date'); }

  get expirationDate() { return this.addVaccineForm.get('expirationDate'); }

}
