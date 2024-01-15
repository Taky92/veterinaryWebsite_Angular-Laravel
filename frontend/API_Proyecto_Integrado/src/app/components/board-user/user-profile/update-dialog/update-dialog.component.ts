import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { format, parse } from 'date-fns';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  editForm: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    const parsedBirthdate = parse(this.data.user.birthdate, 'dd/MM/yyyy', new Date());

    this.editForm = this.formBuilder.group({
      name: [this.data.user.name, Validators.required],
      surname: [this.data.user.surname, Validators.required],
      email: [this.data.user.email, Validators.compose([Validators.required, Validators.email])],
      phone: [this.data.user.phone, Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])],
      birthdate: [parsedBirthdate, Validators.compose([Validators.required, this.validateAge.bind(this)])],
      photo: [this.data.user.photo],
    });
  }

  validateAge(control: AbstractControl) {
    const birthdate = new Date(control.value);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    const minDate = new Date(currentYear - 18, currentMonth, currentDay);
    return birthdate <= minDate ? null : { underage: true };

  }

  onSaveChanges(): void {
    if (this.editForm.valid) {
      const userEdit = {
        id: this.data.user.idUser,
        name: this.editForm.value.name,
        surname: this.editForm.value.surname,
        email: this.editForm.value.email,
        phone: this.editForm.value.phone,
        birthdate: format(this.editForm.value.birthdate, 'dd/MM/yyyy'),
        photo: this.editForm.value.photo ? this.editForm.value.photo : this.data.user.photo,
      };

      this.dialogRef.close(userEdit);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get name() {
    return this.editForm.get('name');
  }

  get surname() {
    return this.editForm.get('surname');
  }

  get email() {
    return this.editForm.get('email');
  }

  get phone() {
    return this.editForm.get('phone');
  }

  get birthdate() {
    return this.editForm.get('birthdate');
  }

  get photo() {
    return this.editForm.get('photo');
  }

}
