import { Component, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Report } from 'src/app/models/report.interface';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-reports-admin-table',
  templateUrl: './reports-admin-table.component.html',
  styleUrls: ['./reports-admin-table.component.scss']
})
export class ReportsAdminTableComponent implements OnChanges, AfterViewInit {

  @Input() reportList: Report[] = [];

  constructor(private dialogService: DialogService,
    private reportService: ReportService) { }

  displayedColumns: string[] = ['name', 'pdf', 'description', 'date', 'actions'];
  dataSource = new MatTableDataSource<Report>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reportList']) {
      this.dataSource.data = this.reportList;
    }
  }

  deleteReport(id: number) {
    this.dialogService.openConfirmDialog('¿Estás seguro que quieres eliminar este reporte?')
      .subscribe(result => {
        if (result) {
          this.reportService.deleteReport<Report>(id).subscribe(() => {
            this.reportList = this.reportList.filter(report => report.idReport !== id);
            this.dataSource.data = this.reportList;
            this.dialogService.openSuccessDialog('Reporte eliminado correctamente');
          });
        }
      }
      );
  }

}
