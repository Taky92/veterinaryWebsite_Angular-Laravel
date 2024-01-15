import { Component, ViewChild, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Vaccine } from 'src/app/models/vaccine.inteface';

@Component({
  selector: 'app-vaccines-table',
  templateUrl: './vaccines-table.component.html',
  styleUrls: ['./vaccines-table.component.scss']
})
export class VaccinesTableComponent implements OnChanges, AfterViewInit {

  constructor() { }

  @Input() vaccines: Vaccine[] = [];

  displayedColumns: string[] = ['name', 'date', 'expiration'];
  dataSource = new MatTableDataSource<Vaccine>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vaccines']) {
      this.dataSource.data = this.vaccines;
    }
  }

}
