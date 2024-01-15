import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { Pet } from 'src/app/models/pet.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from 'src/app/services/pet/pet.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddPetDialogComponent } from '../../dateDetail/add-pet-dialog/add-pet-dialog.component';
import { DialogService } from 'src/app/services/notifications/dialog.service';


@Component({
  selector: 'app-user-accordion',
  templateUrl: './user-accordion.component.html',
  styleUrls: ['./user-accordion.component.scss']
})
export class UserAccordionComponent implements OnInit {

  panelOpenState = false;
  @Input() userList: User[] = [];
  @Input() phoneFilter: string = '';
  @Output() addPetClick: EventEmitter<Pet> = new EventEmitter<Pet>();
  selectPetForm: FormGroup = new FormGroup({});
  pets: Pet[] = [];
  selectePet: Pet = {} as Pet;

  constructor(private petService: PetService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.selectPetForm = this.formBuilder.group({
      pet: [null, Validators.required]
    });

    this.selectPetForm.get('pet')?.valueChanges.subscribe((pet: Pet) => {
      this.selectePet = pet;
    });

  }

  loadPets(idUser: number, phone?: string) {
    const filteredUsers = this.userList.filter(user => user.phone.includes(phone || ''));

    this.petService.getPetsByUser<Pet>(idUser).subscribe((pets: Pet[]) => {
      this.pets = pets;
    });
  }

  goToMedicaments() {
    this.router.navigate(['/admin/medicaments/', this.selectePet]);
  }

  goToReports() {
    this.router.navigate(['/admin/reports/', this.selectePet]);
  }

  goToVaccines() {
    this.router.navigate(['/admin/vaccines/', this.selectePet]);
  }

  onAddPet(id: number) {
    const dialogRef = this.dialog.open(AddPetDialogComponent, {
      width: '600px',
      height: '750px',
      data: { idUser: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPetClick.emit(result);
        this.dialogService.openSuccessDialog('Mascota añadida correctamente');
      }
    });
  }

}
