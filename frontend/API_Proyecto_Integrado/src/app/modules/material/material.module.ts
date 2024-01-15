import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Módulos de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule { }
