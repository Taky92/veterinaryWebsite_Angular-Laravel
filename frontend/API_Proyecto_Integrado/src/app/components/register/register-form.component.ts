import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { format } from 'date-fns';
import { RegisterService } from 'src/app/services/register/register.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/notifications/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  minDate: Date;

  constructor(private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService) {

    //minDate debe ser 18 años antes de la fecha actual
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 18, currentMonth, currentDay);
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{9}')])],
      birthdate: ['', Validators.compose([Validators.required, this.validateAge.bind(this)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get surname() {
    return this.registerForm.get('surname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get birthdate() {
    return this.registerForm.get('birthdate');
  }

  get password() {
    return this.registerForm.get('password');
  }

  validateAge(control: AbstractControl) {
    const birthdate = new Date(control.value);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    const minDate = new Date(currentYear - 18, currentMonth, currentDay);
    return birthdate <= minDate ? null : { underage: true };

  }


  onSubmit() {

    const birthdate = this.registerForm.get('birthdate')?.value;
    const formattedBirthdate = format(birthdate, 'dd/MM/yyyy');

    if (this.registerForm.valid) {
      const data = {
        ...this.registerForm.value,
        birthdate: formattedBirthdate,
        photo: "user.png"
      }

      this.registerService.registerUser(data).subscribe({
        next: (response) => {
          this.authService.setAuthenticationStatusAndUser(true, response.user, 'user', response.token);
        },
        error: (error: Object) => {
          this.registerService.openErrorDialog(`El teléfono o el email ya están registrados`);
        },
        complete: () => {
          this.router.navigate(['/home']);
          this.dialogService.openSuccessDialog('Usuario registrado correctamente');
        }
      });

    }
  }
}
