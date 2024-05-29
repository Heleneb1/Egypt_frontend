import { Component, EventEmitter, Output } from '@angular/core';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  authError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  checkEmail() {
    if (this.user.email) {
      this.isEmailValid = !!this.user.email.match(
        /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i
      );
    }
  }

  onSubmit() {
    if (this.isEmailValid && this.user.password) {
      this.loginUser();
    }
  }

  loginUser() {
    // supprimer un ancien JWT avant de se connecter
    localStorage.removeItem('auth_token');
    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        const { token, user } = response;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.toastr.success('Vous êtes connecté !');
        this.handleUserRole();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      },
    });
  }

  handleUserRole() {
    this.authService.getUserRole().subscribe({
      next: (userRole) => {
        this.userRole = userRole;
        this.redirectUser(userRole);
      },
      error: () => {
        this.authError = "Impossible de récupérer le rôle de l'utilisateur";
      },
    });
  }

  redirectUser(userRole: string) {
    if (userRole == 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.Unauthorized) {
      this.authError = 'Les identifiants sont incorrects';
    } else {
      this.authError = 'Une erreur est survenue';
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
