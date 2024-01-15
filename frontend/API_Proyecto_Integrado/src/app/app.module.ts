import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';

//Pipes
import { TranslatePipe } from './pipes/translate.pipe';
import { NamePetPipe } from './pipes/name-pet.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';

// Angular Material
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

//Componentes
import { NavComponent } from './components/home/nav/nav.component';
import { MenuComponent } from './components/home/menu/menu.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/register/register-form.component';
import { CarrouselComponent } from './components/home/carrousel/carrousel.component';
import { BenefitComponent } from './components/home/benefit/benefit.component';
import { FooterComponent } from './components/home/footer/footer.component';
import { FloatButtonComponent } from './components/home/float-button/float-button.component';
import { UserFormComponent } from './components/login/user-form/user-form.component';
import { AdminFormComponent } from './components/login/admin-form/admin-form.component';
import { ErrorAuthDialogComponent } from './components/notification/error-auth-dialog/error-auth-dialog.component';
import { CardOwnerComponent } from './components/board-user/user-profile/card-owner/card-owner.component';
import { CardPetComponent } from './components/board-user/user-profile/card-pet/card-pet.component';
import { MedicamentTableComponent } from './components/board-user/medicament-table/medicament-table.component';
import { TableDatesComponent } from './components/board-admin/principal/table-dates/table-dates.component';
import { CardPetDatesComponent } from './components/board-user/dates/card-pet-dates/card-pet-dates.component';
import { DatesFormComponent } from './components/board-user/dates/dates-form/dates-form.component';
import { ReportsTableComponent } from './components/board-user/reports-table/reports-table.component';
import { VaccinesTableComponent } from './components/board-user/vaccines-table/vaccines-table.component';
import { ConfirmDialogComponent } from './components/notification/confirm-dialog/confirm-dialog.component';
import { UpdateDialogComponent } from './components/board-user/user-profile/update-dialog/update-dialog.component';
import { DatesAdminFormComponent } from './components/board-admin/principal/dates-form/dates-admin-form.component';


//Paginas
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/board-user/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReportsComponent } from './pages/board-user/reports/reports.component';
import { VaccinesComponent } from './pages/board-user/vaccines/vaccines.component';
import { MedicamentsComponent } from './pages/board-user/medicaments/medicaments.component';
import { DatesComponent } from './pages/board-user/dates/dates.component';
import { PrincipalComponent } from './pages/board-admin/principal/principal.component';
import { AdminMedicamentComponent } from './pages/board-admin/admin-medicament/admin-medicament.component';
import { AdminVaccinesComponent } from './pages/board-admin/admin-vaccines/admin-vaccines.component';
import { AdminReportsComponent } from './pages/board-admin/admin-reports/admin-reports.component';
import { DateDetailsComponent } from './pages/board-admin/date-details/date-details.component';
import { CardUserComponent } from './components/board-admin/dateDetail/card-user/card-user.component';
import { CardPatientComponent } from './components/board-admin/dateDetail/card-patient/card-patient.component';
import { CardDateDetailsComponent } from './components/board-admin/dateDetail/card-date-details/card-date-details.component';
import { AddPetDialogComponent } from './components/board-admin/dateDetail/add-pet-dialog/add-pet-dialog.component';
import { UpdatePetDialogComponent } from './components/board-admin/dateDetail/update-pet-dialog/update-pet-dialog.component';
import { SuccessDialogComponent } from './components/notification/success-dialog/success-dialog.component';
import { MedicamentsAdminTableComponent } from './components/board-admin/medicaments-admin-table/medicaments-admin-table.component';
import { VaccinesAdminTableComponent } from './components/board-admin/vaccines-admin-table/vaccines-admin-table.component';
import { ReportsAdminTableComponent } from './components/board-admin/reports-admin-table/reports-admin-table.component';
import { AddMedicamentDialogComponent } from './components/board-admin/addDialogs/add-medicament-dialog/add-medicament-dialog.component';
import { AddVaccineDialogComponent } from './components/board-admin/addDialogs/add-vaccine-dialog/add-vaccine-dialog.component';
import { AddReportDialogComponent } from './components/board-admin/addDialogs/add-report-dialog/add-report-dialog.component';
import { UserListComponent } from './pages/board-admin/user-list/user-list.component';
import { UserAccordionComponent } from './components/board-admin/userList/user-accordion/user-accordion.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    CarrouselComponent,
    BenefitComponent,
    FooterComponent,
    FloatButtonComponent,
    UserFormComponent,
    AdminFormComponent,
    ErrorAuthDialogComponent,
    CardOwnerComponent,
    CardPetComponent,
    TranslatePipe,
    ReportsComponent,
    VaccinesComponent,
    MedicamentsComponent,
    MedicamentTableComponent,
    ReportsTableComponent,
    VaccinesTableComponent,
    ConfirmDialogComponent,
    UpdateDialogComponent,
    DatesComponent,
    CardPetDatesComponent,
    DatesFormComponent,
    DatesAdminFormComponent,
    PrincipalComponent,
    AdminMedicamentComponent,
    AdminVaccinesComponent,
    AdminReportsComponent,
    DateDetailsComponent,
    TableDatesComponent,
    NamePetPipe,
    CardUserComponent,
    CardPatientComponent,
    CardDateDetailsComponent,
    TruncateTextPipe,
    AddPetDialogComponent,
    UpdatePetDialogComponent,
    SuccessDialogComponent,
    MedicamentsAdminTableComponent,
    VaccinesAdminTableComponent,
    ReportsAdminTableComponent,
    AddMedicamentDialogComponent,
    AddVaccineDialogComponent,
    AddReportDialogComponent,
    UserListComponent,
    UserAccordionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    // Angular Material
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    MatAutocompleteModule,
    NgxMatFileInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
