import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

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

  handleServerResponse(response: HttpResponse<any>) {
    if (response.status === 200) {
      const authHeader = response.headers.get('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        this.authService.setToken(token);

        const tokenInfo = this.authService.getUserToken();
        if (tokenInfo) {
          if (tokenInfo.scope === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/profile']);
          }
        } else {
          this.loginError.emit(
            'Erreur lors de la récupération du rôle utilisateur'
          );
        }
      } else {
        this.loginError.emit('Erreur lors de la récupération du token');
      }
    }
  }
  loginUser() {
    if (this.isEmailValid) {
      this.http
        .post<HttpResponse<any>>(
          `${environment.apiUrl}/api/auth/login`,
          this.user,
          {
            observe: 'response',
            withCredentials: true,
          }
        )
        .subscribe(
          (response) => {
            this.handleServerResponse(response);
          },
          (error) => {
            console.error('Login error:', error);
            this.loginError.emit('Mauvais identifiants saisis');
          }
        );
      return;
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

  constructor() {
    this.email = '';
    this.password = '';
  }
}
