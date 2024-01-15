import { Component, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vaccine } from 'src/app/models/vaccine.inteface';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { VaccineService } from 'src/app/services/vaccines/vaccine.service';

@Component({
  selector: 'app-vaccines-admin-table',
  templateUrl: './vaccines-admin-table.component.html',
  styleUrls: ['./vaccines-admin-table.component.scss']
})
export class VaccinesAdminTableComponent implements OnChanges, AfterViewInit {

  @Input() vaccineList: Vaccine[] = [];

  constructor(private dialogService: DialogService,
    private vaccineService: VaccineService) { }

  displayedColumns: string[] = ['name', 'date', 'expiration', 'actions'];
  dataSource = new MatTableDataSource<Vaccine>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vaccineList']) {
      this.dataSource.data = this.vaccineList;
    }
  }

  deleteVaccine(id: number) {
    this.dialogService.openConfirmDialog('¿Estás seguro que quieres eliminar esta vacuna?')
      .subscribe(result => {
        if (result) {
          this.vaccineService.deleteVaccine<Vaccine>(id).subscribe(() => {
            this.vaccineList = this.vaccineList.filter(vaccine => vaccine.idVaccine !== id);
            this.dataSource.data = this.vaccineList;
            this.dialogService.openSuccessDialog('Vacuna eliminada correctamente');
          });
        }
      }
      );
  }

}
