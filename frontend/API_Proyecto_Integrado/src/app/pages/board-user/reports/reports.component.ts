import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report.interface';
import { Pet } from 'src/app/models/pet.interface';
import { ReportService } from 'src/app/services/report/report.service';
import { PetService } from 'src/app/services/pet/pet.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportList: Report[] = [];
  petName: string = '';

  constructor(private route: ActivatedRoute, private reportService: ReportService, private petService: PetService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const petId = params['petId'];
      this.reportService.getReportByPet<Report>(petId).subscribe(report => {
        this.reportList = report;
      });
      this.petService.getPetName<string>(petId).subscribe(pet => {
        this.petName = pet;
      });
    });
  }

  goBack(): void {
    window.history.back();
  }

}
