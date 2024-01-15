import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report/report.service';
import { Report } from 'src/app/models/report.interface';

@Component({
  selector: 'app-add-report-dialog',
  templateUrl: './add-report-dialog.component.html',
  styleUrls: ['./add-report-dialog.component.scss']
})
export class AddReportDialogComponent implements OnInit {

  addReportForm: FormGroup = new FormGroup({});
  fileControl = this.formBuilder.control(null);

  constructor(
    public dialogRef: MatDialogRef<AddReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.addReportForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onAddReport() {
    const date = this.addReportForm.get('date')?.value;
    const dateFormatted = format(date, 'dd/MM/yyyy');

    if (this.addReportForm.valid) {
      const newReport = {
        name: this.addReportForm.value.name,
        description: this.addReportForm.value.description,
        date: dateFormatted,
        idPet: this.data.idPet
      }

      if (this.fileControl.value !== null) {
        this.reportService.addReport(newReport, this.fileControl.value).subscribe({
          next: (data) => {
            this.dialogRef.close(data);
          },
          error: (error) => {
            console.error('Error al añadir el reporte', error);
          }
        });
      } else {
        console.error('Error: El archivo es nulo');
      }

    } else {
      console.error('Formulario inválido:', this.addReportForm.value);
    }
  }



  get name() { return this.addReportForm.get('name'); }

  get description() { return this.addReportForm.get('description'); }

  get date() { return this.addReportForm.get('date'); }

}
