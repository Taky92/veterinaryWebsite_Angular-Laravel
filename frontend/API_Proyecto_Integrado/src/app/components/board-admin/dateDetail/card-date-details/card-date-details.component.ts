import { Component, Input, OnInit } from '@angular/core';
import { Dates } from 'src/app/models/dates.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-date-details',
  templateUrl: './card-date-details.component.html',
  styleUrls: ['./card-date-details.component.scss']
})
export class CardDateDetailsComponent implements OnInit {

  @Input() date: Dates = {} as Dates;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMedicaments(id: number): void {
    this.router.navigate([`/admin/medicaments/${id}`]);
  }

  goToReports(id: number): void {
    this.router.navigate([`/admin/reports/${id}`]);
  }

  goToVaccines(id: number): void {
    this.router.navigate([`/admin/vaccines/${id}`]);
  }

}
