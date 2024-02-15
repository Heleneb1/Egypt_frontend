import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src//environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = new loginUser();
  isEmailValid = false;

  showPassword: boolean = false;

  @Output() loginError = new EventEmitter<string>();
  userRole: string = '';
  constructor (private http: HttpClient, private router: Router, private authService: AuthService) { }

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
              this.authService.getUserRole().subscribe((userRole) => {
                this.userRole = userRole;
                if (userRole === 'ADMIN') {
                  this.router.navigate(['/admin']);
                } else {
                  this.router.navigate(['/profile']);
                }
              });
            }
          },
          (error) => {
            console.error('Erreur côté client :', error);
            this.loginError.emit('Erreur côté client lors de l\'authentification');
          }
        );
    } else {
      this.loginError.emit('De mauvais identifiants ont été saisis');
      return false;
    }

  }

  click() {
    this.showPassword = !this.showPassword;
  }

}


export class loginUser {
  email: string;
  password: string;

  constructor () {
    this.email = '';
    this.password = '';
  }

}
