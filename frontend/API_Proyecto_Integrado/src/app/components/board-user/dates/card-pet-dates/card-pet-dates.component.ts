import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.interface';
import { Dates } from 'src/app/models/dates.interface';
import { DatesService } from 'src/app/services/dates/dates.service';
import { VeterinaryService } from 'src/app/services/admin/veterinary.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';

@Component({
  selector: 'app-card-pet-dates',
  templateUrl: './card-pet-dates.component.html',
  styleUrls: ['./card-pet-dates.component.scss']
})
export class CardPetDatesComponent implements OnInit {

  @Input() pet: Pet = {} as Pet;
  @Output() datedropped = new EventEmitter<number>();
  petDate: Dates = {} as Dates;
  vetName: string = '';

  constructor(private dateService: DatesService,
    private vetService: VeterinaryService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.dateService.getDatesByPet(this.pet.idPet).subscribe(date => {
      if (date.length > 0 || date != undefined){
        this.petDate = date[0];
      }
    });
    this.vetService.getshowVeterinaryName<string>(this.pet.idVeterinary).subscribe(vetName => {
      if (vetName != null){
        this.vetName = vetName;
      }
    });
  }

  dropDate() {
    this.dialogService.openConfirmDialog('¿Estás seguro de que quieres anular la cita?')
      .subscribe(result => {
        if (result) {
          this.dateService.deleteDate(this.petDate.idDate).subscribe(() => {
            this.datedropped.emit(this.pet.idPet);
            this.dialogService.openSuccessDialog('Cita eliminada correctamente');
          });
        }
      });

  }
}
