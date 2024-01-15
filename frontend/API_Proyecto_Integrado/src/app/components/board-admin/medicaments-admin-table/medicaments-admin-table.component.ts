import { Component, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medication } from 'src/app/models/medication.inteface';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { MedicationService } from 'src/app/services/medication/medication.service';

@Component({
  selector: 'app-medicaments-admin-table',
  templateUrl: './medicaments-admin-table.component.html',
  styleUrls: ['./medicaments-admin-table.component.scss']
})
export class MedicamentsAdminTableComponent implements OnChanges, AfterViewInit {

  @Input() medicationList: any[] = [];

  constructor(private dialogService: DialogService,
    private medicationService: MedicationService) { }

  displayedColumns: string[] = ['name', 'start_date', 'end_date', 'treatment', 'actions'];
  dataSource = new MatTableDataSource<Medication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['medicationList']) {
      this.dataSource.data = this.medicationList;
    }
  }

  deleteMedication(id: number) {
    this.dialogService.openConfirmDialog('¿Estás seguro que quieres eliminar esta medicación?')
      .subscribe(result => {
        if (result) {
          this.medicationService.deleteMedication<Medication>(id).subscribe(() => {
            this.medicationList = this.medicationList.filter(medication => medication.idMedication !== id);
            this.dataSource.data = this.medicationList;
            this.dialogService.openSuccessDialog('Medicación eliminada correctamente');
          });
        }
      }
      );
  }

}
