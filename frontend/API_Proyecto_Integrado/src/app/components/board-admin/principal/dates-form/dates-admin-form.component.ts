import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Pet } from 'src/app/models/pet.interface';
import { DatesService } from 'src/app/services/dates/dates.service';
import { UserService } from 'src/app/services/user/user.service';
import { PetService } from 'src/app/services/pet/pet.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { format } from 'date-fns';
import { Subscription, debounceTime, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-dates-admin-form',
  templateUrl: './dates-admin-form.component.html',
  styleUrls: ['./dates-admin-form.component.scss']
})
export class DatesAdminFormComponent implements OnInit, OnDestroy {

  @Input() vetId: number = 0;
  @Output() dateAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  hours: string[] = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
  originalHours: string[] = [...this.hours];
  availablePets: Pet[] = [];
  allPets: Pet[] = [];
  userId: number = 0;
  occupiedHours: string[] = [];

  datesAdminForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private datesService: DatesService,
    private userService: UserService,
    private petService: PetService,
    private dialogService: DialogService,
  ) { }

  private phoneUserSubscription: Subscription | undefined;

  private dateSubscription: Subscription | undefined;

  ngOnInit(): void {

    this.datesAdminForm = this.formBuilder.group({
      phoneUser: [null, Validators.compose([Validators.pattern('[0-9]{9}'), Validators.required])],
      mascot: [0, Validators.compose([Validators.min(1), Validators.required])],
      dates: [null, Validators.compose([Validators.required, this.dateValidator])],
      times: [null, Validators.compose([Validators.required])],
      reason: ['']
    });

    this.phoneUserSubscription = this.datesAdminForm.get('phoneUser')?.valueChanges.pipe(
      debounceTime(700),
      switchMap(phone => {
        const phoneValue = phone ? phone : 0;
        return this.userService.getUserByPhone(phoneValue);
      }),
      tap(user => {
        if (user && user.idUser !== undefined) {
          this.userId = user.idUser;
          this.petService.getPetsByUser<Pet>(this.userId).subscribe(pets => {
            if (pets.length !== undefined) {
              this.allPets = pets;
              this.filterPetsWithDates();
            }
          });
        } else {
          this.datesAdminForm.get('phoneUser')?.setErrors({ 'userId': 0 });
          this.userId = 0;
          this.allPets = [];
          this.availablePets = [];
        }
      })
    ).subscribe();

    this.dateSubscription = this.datesAdminForm.get('dates')?.valueChanges.pipe(
      tap(date => {
        this.restoreOriginalHours();
        this.getOccupiedHours(this.vetId, date);
      })
    ).subscribe();

  }

  ngOnDestroy() {
    if (this.phoneUserSubscription) {
      this.phoneUserSubscription.unsubscribe();
    }

    if (this.dateSubscription) {
      this.dateSubscription.unsubscribe();
    }
  }

  filterPetsWithDates(): void {
    this.availablePets = [];

    this.allPets.forEach(pet => {
      this.datesService.getDatesByPet(pet.idPet).subscribe(dates => {
        if (!dates || dates.length === 0) {
          this.availablePets.push(pet);
        }
      });
    });
  }

  getOccupiedHours(VetId: number, selectedDate: Date) {
    if (!selectedDate) {
      return;
    }

    this.datesService.getHoursDatesByVet(VetId, selectedDate).subscribe(
      (occupiedHours: string[]) => {
        if (Array.isArray(occupiedHours)) {
          const availableHours = this.hours.filter(time => !occupiedHours.includes(time));
          this.occupiedHours = occupiedHours;
          this.updateAvailableHours();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateAvailableHours() {
    const availableHours = this.hours.filter(time => !this.occupiedHours.includes(time));

    if (this.datesAdminForm) {
      this.hours = availableHours;
    }
  }

  dateValidator(control: FormControl): { [key: string]: any } | null {
    const selectedDate = control.value;
    const today = new Date();


    if (selectedDate < today) {
      return { 'underage': true };
    }

    return null;
  }

  restoreOriginalHours() {
    this.hours = [...this.originalHours]
  }

  get dates() {
    return this.datesAdminForm.get('dates');
  }

  get times() {
    return this.datesAdminForm.get('times');
  }

  get phoneUser() {
    return this.datesAdminForm.get('phoneUser');
  }

  get mascot() {
    return this.datesAdminForm.get('mascot');
  }

  get reason() {
    return this.datesAdminForm.get('reason');
  }


  onSubmit() {
    const date = this.datesAdminForm.get('dates')?.value;

    if (this.datesAdminForm.valid) {
      const formValues = this.datesAdminForm.value;

      if (!(date instanceof Date)) {
        console.error('Invalid date');
        return;
      }

      const selectedPet = this.allPets.find(pet => pet.idPet === formValues.mascot);
      const newDate = {
        idPet: formValues.mascot,
        date: format(date, 'dd/MM/yyyy'),
        time: formValues.times,
        reason: formValues.reason ? formValues.reason : 'Consulta',
        idVeterinary: this.vetId,
      };

      this.datesService.addDate(newDate).subscribe({
        next: (response) => {
          this.datesAdminForm.reset();
          this.dateAdded.emit(true);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.dialogService.openSuccessDialog('Cita creada correctamente');
        }
      });

    }
  }

}
