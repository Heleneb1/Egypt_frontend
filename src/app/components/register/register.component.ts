import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../password-validators';

export interface RegisterUser {
  lastname: string;
  firstname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() registrationStatus = new EventEmitter<{ success: boolean; submitted: boolean; }>();

  passwordMatch = true;
  passwordStrong = false;
  isEmailValid = false;
  confirmationPassword = '';
  formSubmitted = false;
  showPassword = false;
  userForm: FormGroup;

  constructor (private http: HttpClient, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      confirmationPassword: ['']
    });
  }

  verifyPassword() {
    this.passwordMatch = this.userForm.value.password === this.userForm.value.confirmationPassword;
  }

  verifyPasswordStrength() {
    const password = this.userForm.value.password;
    this.passwordStrong = password !== undefined && password.length >= 12;
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.userForm.valid && this.passwordMatch && this.passwordStrong && this.isEmailValid) {
      this.registerUser();
    } else {
      this.registrationStatus.emit({
        success: false,
        submitted: this.formSubmitted,
      });
    }
  }

  checkEmail() {
    const email = this.userForm.value.email;
    this.isEmailValid = email !== undefined && /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i.test(email);
  }

  registerUser() {

    const user: RegisterUser = {
      lastname: this.userForm.value.lastname,
      firstname: this.userForm.value.firstname,
      email: this.userForm.value.email,
      password: this.userForm.value.password

    };


    this.http
      .post(environment.apiUrl + '/api/auth/register', user, {
        observe: 'response',
      })
      .subscribe((response) => {
        if (response.status === 200 || response.status === 201) {
          this.registrationStatus.emit({
            success: true,
            submitted: this.formSubmitted,
          });
        } else if (response.status >= 400) {
          this.registrationStatus.emit({
            success: false,
            submitted: this.formSubmitted,
          });
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
