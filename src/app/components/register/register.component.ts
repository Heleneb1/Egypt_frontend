import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() registrationStatus = new EventEmitter<{
    success: boolean;
    submitted: boolean;
  }>();
  passwordMatch = true;
  passwordStrong = false;
  isEmailValid = false;
  formSubmitted = false;
  confirmationPassword = '';
  user = new registerUser();
  showPassword = false;

  constructor(private http: HttpClient) { }

  verifyPassword() {
    this.passwordMatch = this.user.password === this.confirmationPassword;
  }

  verifyPasswordStrength() {
    if (this.user.password !== undefined) {
      this.passwordStrong = this.user.password.length >= 8;
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (
      this.passwordMatch &&
      this.passwordStrong &&
      this.isEmailValid &&
      this.user.firstname !== undefined &&
      this.user.lastname !== undefined &&
      this.user.email !== undefined &&
      this.user.password !== undefined &&
      this.user.firstname !== '' &&
      this.user.lastname !== '' &&
      this.user.email !== '' &&
      this.user.password !== ''
    ) {
      this.registerUser();
    } else {
      this.registrationStatus.emit({
        success: false,
        submitted: this.formSubmitted,
      });
    }
  }

  checkEmail() {
    if (this.user.email !== undefined) {
      this.isEmailValid = !!this.user.email.match(
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i
      );
    }
  }

  registerUser() {
    return this.http
      .post(environment.apiUrl + '/api/auth/register', this.user, {
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

export class registerUser {
  lastname: string;
  firstname: string;
  email: string;
  password: string;

  constructor() {
    this.lastname = '';
    this.firstname = '';
    this.email = '';
    this.password = '';
  }
}
