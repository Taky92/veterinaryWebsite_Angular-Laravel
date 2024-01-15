import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  loginUser: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginUser = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      userType: ['user']
    });
  }

  onSubmit() {
    if (this.loginUser.valid) {
      this.submitForm.emit(this.loginUser.value);
      this.resetForm();
    }
  }

  resetForm() {
    this.loginUser.reset(
      {
        email: '',
        password: '',
        userType: 'user'
      }
    );
  }

  get email() {
    return this.loginUser.get('email');
  }

  get password() {
    return this.loginUser.get('password');
  }

  get userType() {
    return this.loginUser.get('userType');
  }
}
