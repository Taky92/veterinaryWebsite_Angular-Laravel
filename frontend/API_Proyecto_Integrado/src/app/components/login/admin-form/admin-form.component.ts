import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  loginAdmin: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginAdmin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      typeUser: ['admin']
    });
  }

  onSubmit() {
    if (this.loginAdmin.valid) {
      this.submitForm.emit(this.loginAdmin.value);
      this.resetForm();
    }
  }

  resetForm() {
    this.loginAdmin.reset(
      {
        username: '',
        password: '',
        typeUser: 'admin'
      }
    );
  }

  get username() {
    return this.loginAdmin.get('username');
  }

  get password() {
    return this.loginAdmin.get('password');
  }

  get typeUser() {
    return this.loginAdmin.get('typeUser');
  }

}
