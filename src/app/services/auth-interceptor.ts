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
  constructor (private cookieService: CookieService, private authService: AuthService) { }
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    const token = this.cookieService.get('token');
    console.log(typeof token);

    console.log('token', token);


    if (token !== undefined && token !== null && token !== '') {
      // Définir le cookie avec les options nécessaires
      this.authService.setUserToken(token);

      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        headers: request.headers.set("Authorization", "Bearer " + token),
        withCredentials: true,
      });
    }
    console.log('request', request);
    return next.handle(request);
  }
}
