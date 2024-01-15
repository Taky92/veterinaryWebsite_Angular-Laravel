import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.interface';
import { DatesService } from 'src/app/services/dates/dates.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { format } from 'date-fns';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dates-form',
  templateUrl: './dates-form.component.html',
  styleUrls: ['./dates-form.component.scss'],
})
export class DatesFormComponent implements OnInit, OnDestroy {

  minDate = new Date();

  @Input() pets: Pet[] = [];
  @Input() petsWithDates: Pet[] = [];
  @Output() dateAdded: EventEmitter<boolean> = new EventEmitter();

  availablePets: Pet[] = [];

  hours: string[] = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
  originalHours: string[] = [...this.hours];

  datesForm: FormGroup = new FormGroup({});

  private suscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
    private datesService: DatesService,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {

    this.datesForm = this.formBuilder.group({
      mascot: [0, Validators.compose([Validators.min(1)])],
      dates: [null, Validators.compose([Validators.required, this.dateValidator])],
      times: [null],
      reason: ['']
    });

    this.suscription = this.datesForm.valueChanges.subscribe(formValues => {
      const selectedPetId = formValues.mascot;
      const vetId: any = this.pets.find(pet => pet.idPet === selectedPetId)?.idVeterinary;
      const date: any = formValues.dates;

      if (selectedPetId !== 0 && date) {
        this.restoreOriginalHours();
        this.getOccupiedHours(vetId, date);
      }

      this.getAvailablePets();

    });

  }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  getAvailablePets() {
    this.availablePets = this.pets.filter(pet => !this.petsWithDates.some(
      petWithDate => petWithDate.idPet === pet.idPet));
  }

  getOccupiedHours(VetId: number, selectedDate: Date) {

    this.datesService.getHoursDatesByVet(VetId, selectedDate).subscribe(
      (occupiedHours: string[]) => {
        if (Array.isArray(occupiedHours)) {
          const availableHours = this.hours.filter(time => !occupiedHours.includes(time));

          if (this.datesForm) {
            this.hours = availableHours;
          }
        }
      }
    );
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
    this.hours = [...this.originalHours]; // Restaurar las horas originales
  }

  get petsForm() {
    return this.datesForm.get('pets');
  }

  get dates() {
    return this.datesForm.get('dates');
  }

  get timesForm() {
    return this.datesForm.get('times');
  }

  get reason() {
    return this.datesForm.get('reason');
  }

  onSubmit() {

    const date = this.datesForm.get('dates')?.value;

    if (this.datesForm.valid) {
      const formValues = this.datesForm.value;

      const selectedPet = this.pets.find(pet => pet.idPet === formValues.mascot);
      const newDate = {
        idPet: formValues.mascot,
        date: format(date, 'dd/MM/yyyy'),
        time: formValues.times,
        reason: formValues.reason ? formValues.reason : 'Consulta', idVeterinary: selectedPet?.idVeterinary,
      };

      this.datesService.addDate(newDate).subscribe({
        next: (response) => {
          this.datesForm.reset();
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
