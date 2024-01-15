import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VeterinaryService } from 'src/app/services/admin/veterinary.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format, parse } from 'date-fns';
import { Admin } from 'src/app/models/admin.interface';

@Component({
  selector: 'app-update-pet-dialog',
  templateUrl: './update-pet-dialog.component.html',
  styleUrls: ['./update-pet-dialog.component.scss']
})
export class UpdatePetDialogComponent implements OnInit {

  updatePetForm: FormGroup = new FormGroup({});

  genders = [{ value: 'Macho', name: 'male' }, { value: 'Hembra', name: 'female' }]
  species = [{ value: 'Perro', name: 'dog' }, { value: 'Gato', name: 'cat' }]
  veterinaries: Admin[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdatePetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private veterinaryService: VeterinaryService,
  ) { }

  ngOnInit(): void {
    const parsedBirthdate = parse(this.data.pet.birthdate, 'dd/MM/yyyy', new Date());


    this.updatePetForm = this.formBuilder.group({
      name: [this.data.pet.name, Validators.required],
      species: [this.data.pet.species, Validators.required],
      gender: [this.data.pet.gender, Validators.required],
      birthdate: [parsedBirthdate, Validators.required],
      photo: [this.data.pet.photo],
      veterinary: [this.data.pet.idVeterinary, Validators.compose([Validators.required, Validators.min(1)])],
    });

    this.veterinaryService.getVeterinaries().subscribe(
      (data: any) => {
        this.veterinaries = data;
      }
    );
  }

  onUpdatePet(): void {
    if (this.updatePetForm.valid) {
      const petEdit = {
        idPet: this.data.pet.idPet,
        name: this.updatePetForm.value.name,
        species: this.updatePetForm.value.species,
        gender: this.updatePetForm.value.gender,
        birthdate: format(this.updatePetForm.value.birthdate, 'dd/MM/yyyy'),
        photo: this.updatePetForm.value.photo ? this.updatePetForm.value.photo : this.data.pet.photo,
        idVeterinary: this.updatePetForm.value.veterinary
      };
      this.dialogRef.close(petEdit);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get name() {
    return this.updatePetForm.get('name');
  }

  get specie() {
    return this.updatePetForm.get('specie');
  }

  get gender() {
    return this.updatePetForm.get('gender');
  }

  get birthdate() {
    return this.updatePetForm.get('birthdate');
  }

  get photo() {
    return this.updatePetForm.get('photo');
  }

}
