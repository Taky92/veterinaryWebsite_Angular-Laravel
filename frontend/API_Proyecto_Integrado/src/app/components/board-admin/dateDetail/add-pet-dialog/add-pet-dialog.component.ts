import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VeterinaryService } from 'src/app/services/admin/veterinary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { Admin } from 'src/app/models/admin.interface';
@Component({
  selector: 'app-add-pet-dialog',
  templateUrl: './add-pet-dialog.component.html',
  styleUrls: ['./add-pet-dialog.component.scss']
})
export class AddPetDialogComponent implements OnInit {

  addPetForm: FormGroup = new FormGroup({});

  genders = [{ value: 'Macho', name: 'male' }, { value: 'Hembra', name: 'female' }]
  species = [{ value: 'Perro', name: 'dog' }, { value: 'Gato', name: 'cat' }]
  veterinaries: Admin[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private veterinaryService: VeterinaryService,
  ) { }

  ngOnInit(): void {

    this.addPetForm = this.formBuilder.group({
      name: ['', Validators.required],
      species: [null, Validators.required],
      gender: [null, Validators.required],
      birthdate: ['', Validators.required],
      photo: [''],
      veterinary: [0, Validators.compose([Validators.required, Validators.min(1)])],
    });

    //guardar en veterinaries todos los veterinarios
    this.veterinaryService.getVeterinaries().subscribe(
      (data: any) => {
        this.veterinaries = data;
      }
    );

  }

  onAddPet(): void {
    if (this.addPetForm.valid) {
      const newPet = {
        name: this.addPetForm.value.name,
        species: this.addPetForm.value.species,
        gender: this.addPetForm.value.gender,
        birthdate: format(this.addPetForm.value.birthdate, 'dd/MM/yyyy'),
        idUser: this.data.idUser,
        photo: this.addPetForm.value.photo ? this.addPetForm.value.photo : 'pet.png',
        idVeterinary: this.addPetForm.value.veterinary
      };
      this.dialogRef.close(newPet);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get name() {
    return this.addPetForm.get('name');
  }

  get specie() {
    return this.addPetForm.get('specie');
  }

  get gender() {
    return this.addPetForm.get('gender');
  }

  get birthdate() {
    return this.addPetForm.get('birthdate');
  }

  get photo() {
    return this.addPetForm.get('photo');
  }

}
