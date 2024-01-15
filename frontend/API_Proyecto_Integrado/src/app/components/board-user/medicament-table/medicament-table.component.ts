import { Component, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medication } from 'src/app/models/medication.inteface';

@Component({
  selector: 'app-medicament-table',
  templateUrl: './medicament-table.component.html',
  styleUrls: ['./medicament-table.component.scss']
})
export class MedicamentTableComponent implements OnChanges, AfterViewInit {

  constructor() { }

  @Input() medicaments: Medication[] = [];

  displayedColumns: string[] = ['name', 'start_date', 'end_date', 'treatment'];
  dataSource = new MatTableDataSource<Medication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['medicaments']) {
      this.dataSource.data = this.medicaments;
    }
  }
}
