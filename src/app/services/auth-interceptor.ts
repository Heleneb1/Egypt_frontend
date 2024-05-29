import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const auth_token = localStorage.getItem('auth_token');

    if (auth_token !== undefined && auth_token !== null && auth_token !== '') {
      // Définir le cookie avec les options nécessaires
      this.authService.setUserToken(auth_token);

      request = request.clone({
        setHeaders: { Authorization: `Bearer ${auth_token}` },
        withCredentials: true,
        responseType: 'text',
      });
    }
    return next.handle(request);
  }
}
