import { Component, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Report } from 'src/app/models/report.interface';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnChanges, AfterViewInit {

  constructor() { }

  @Input() reports: Report[] = [];

  displayedColumns: string[] = ['name', 'pdf', 'description', 'date'];
  dataSource = new MatTableDataSource<Report>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['reports']) {
      this.dataSource.data = this.reports;
    }
  }

}
