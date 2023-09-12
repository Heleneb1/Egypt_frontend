import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = new loginUser();
  isEmailValid = false;
  @Output() loginError = new EventEmitter<string>();
  constructor(private http: HttpClient, private router: Router) {}

  checkEmail() {
    if (this.user.email !== undefined || this.user.email !== '') {
      this.isEmailValid = !!this.user.email.match(
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i
      );
    }
  }

  onSubmit() {
    if (this.user.email !== undefined && this.user.password !== undefined) {
      this.loginUser();
    }
  }

  loginUser() {
    if (this.isEmailValid) {
      return this.http
        .post(environment.apiUrl + '/api/auth/login', this.user, {
          observe: 'response',
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            if (response.status === 200) {
              this.router.navigate(['/dashboard']);
            }
          },
          () => {
            this.loginError.emit('De mauvais identifiants ont été saisis');
          }
        );
    } else {
      this.loginError.emit('De mauvais identifiants ont été saisis');
      return false;
    }
  }
}

export class loginUser {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
