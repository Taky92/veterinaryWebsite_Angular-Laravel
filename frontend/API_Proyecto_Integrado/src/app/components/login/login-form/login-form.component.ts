import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  userType: string = '';
  user: any = {};


  constructor(private authService: AuthService,
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.authService.getUserType().subscribe((userType: string) => {
      this.userType = userType;
    });
  }

  onSubmitUserForm(form: any) {
    this.authService.authenticateUser(form.email, form.password).subscribe({
      next: (response) => {
        this.authService.setAuthenticationStatusAndUser(true, response, 'user', response.token);
      },
      error: (error) => {
        console.error(`Error al authenticar el usuario:${error.status}-> ${error.message}`);
        this.dialogService.openErrorDialog('Usuario o contraseña incorrectos');
        form = {
          email: '',
          password: '',
          typeUser: 'user'
        }
      },
      complete: () => {
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmitAdminForm(form: any) {
    this.authService.authenticateAdmin(form.username, form.password).subscribe({
      next: (response) => {
        this.authService.setAuthenticationStatusAndUser(true, response, 'admin', response.token);
      },
      error: (error) => {
        console.error(`Error al authenticar el administrador:${error.error}}`);
        this.dialogService.openErrorDialog('Usuario o contraseña incorrectos');
        form = {
          username: '',
          password: '',
          typeUser: 'admin'
        }
      },
      complete: () => {
        this.router.navigate(['/home']);
      }
    });
  }

}
