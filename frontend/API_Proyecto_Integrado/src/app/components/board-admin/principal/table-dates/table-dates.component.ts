import { Component, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dates } from 'src/app/models/dates.interface';
import { DatesService } from 'src/app/services/dates/dates.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-dates',
  templateUrl: './table-dates.component.html',
  styleUrls: ['./table-dates.component.scss']
})
export class TableDatesComponent implements OnChanges, AfterViewInit {

  constructor(private datesService: DatesService, private router: Router, private dialogService: DialogService) { }

  @Input() dates: Dates[] = [];

  displayedColumns: string[] = ['idPet', 'date', 'time', 'reason', 'actions'];
  dataSource = new MatTableDataSource<Dates>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dates']) {
      this.dataSource.data = this.dates;
    }
  }

  openDetails(id: number) {
    this.router.navigate(['/admin/details', id]);
  }

  deleteDate(id: number) {
    this.dialogService.openConfirmDialog('¿Estás seguro que quieres eliminar la cita?')
      .subscribe(result => {
        if (result) {
          this.datesService.deleteDate(id).subscribe(() => {
            this.dates = this.dates.filter(date => date.idDate !== id);
            this.dataSource.data = this.dates;
            this.dialogService.openSuccessDialog('Cita eliminada correctamente');
          });
        }
      }
      );
  }


}
