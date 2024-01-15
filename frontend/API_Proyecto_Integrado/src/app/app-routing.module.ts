import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Pages
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
import { DateDetailsComponent } from './pages/board-admin/date-details/date-details.component';
import { AdminMedicamentComponent } from './pages/board-admin/admin-medicament/admin-medicament.component';
import { AdminVaccinesComponent } from './pages/board-admin/admin-vaccines/admin-vaccines.component';
import { AdminReportsComponent } from './pages/board-admin/admin-reports/admin-reports.component';
import { UserListComponent } from './pages/board-admin/user-list/user-list.component';

//Guards
import { UserGuard } from './guards/auth/user.guard';
import { AdminGuard } from './guards/auth/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { PetsUserGuard } from './guards/auth/pets-user.guard';
import { UserAccessGuard } from './guards/auth/user-access.guard';
import { AdminAccessGuard } from './guards/auth/admin-access.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: ProfileComponent,
        canActivate: [UserGuard]
      },
      {
        path: 'reports/:petId',
        component: ReportsComponent,
        canActivate: [UserGuard, PetsUserGuard],
      },
      {
        path: 'vaccines/:petId',
        component: VaccinesComponent,
        canActivate: [UserGuard, PetsUserGuard],
      },
      {
        path: 'medicaments/:petId',
        component: MedicamentsComponent,
        canActivate: [UserGuard, PetsUserGuard],
      },
      {
        path: 'dates/:idUser',
        component: DatesComponent,
        canActivate: [UserGuard, UserAccessGuard],
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: PrincipalComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'userList',
        component: UserListComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'reports/:petId',
        component: AdminReportsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'vaccines/:petId',
        component: AdminVaccinesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'medicaments/:petId',
        component: AdminMedicamentComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'details/:dateId',
        component: DateDetailsComponent,
        canActivate: [AdminGuard, AdminAccessGuard],
      }

    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
