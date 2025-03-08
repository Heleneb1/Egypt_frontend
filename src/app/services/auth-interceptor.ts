import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private publicEndpoints = [
    '/articles',
    '/articles/:id',
    // Ajout endpoints publics si nécessaire
  ];
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('auth_token');

    // Vérifier si l'URL de la requête est dans la liste des endpoints publics
    const isPublicEndpoint = this.publicEndpoints.some((endpoint) => {
      return request.url.startsWith(endpoint);
    });

    if (authToken && !isPublicEndpoint) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          // Unauthorized or forbidden response, redirect to login page or handle as needed
          console.error('Unauthorized or forbidden request:', error);
          this.authService.logout(); // Example: Logout user on unauthorized access
        }
        return throwError(error);
      })
    );
  }
}
