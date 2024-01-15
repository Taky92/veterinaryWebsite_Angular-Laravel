import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report } from 'src/app/models/report.interface';
import { ReportService } from 'src/app/services/report/report.service';
import { PetService } from 'src/app/services/pet/pet.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { AddReportDialogComponent } from 'src/app/components/board-admin/addDialogs/add-report-dialog/add-report-dialog.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss']
})
export class AdminReportsComponent implements OnInit {

  reportList: Report[] = [];
  petName: string = '';
  petId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private reportService: ReportService,
    private petService: PetService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const petId = params['petId'];
      this.petId = petId;
      this.loadReports();
    });
  }

  private loadReports(): void {
    this.reportService.getReportByPet<Report>(this.petId).subscribe(report => {
      this.reportList = report;
    });
    this.petService.getPetName<string>(this.petId).subscribe(pet => {
      this.petName = pet;
    });
  }

  goBack(): void {
    window.history.back();
  }

  addReport(): void {
    const dialogRef = this.dialog.open(AddReportDialogComponent, {
      width: '600px',
      height: '550px',
      data: { idPet: this.petId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadReports();
        this.dialogService.openSuccessDialog('Reporte añadido correctamente');
      }
    });
  }

}
