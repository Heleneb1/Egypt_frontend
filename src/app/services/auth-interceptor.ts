import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor (private cookieService: CookieService, private authService: AuthService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('token');
    if (token && token.trim() !== '') { // Ajout de cette vérification
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        console.error('Error in interceptor:', error);
        throw error; // Rejeter l'erreur pour qu'elle soit traitée par le gestionnaire d'erreurs global
      })
    );
  }
}  