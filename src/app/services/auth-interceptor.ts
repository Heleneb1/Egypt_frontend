// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthService } from './auth.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private publicEndpoints = [
//     '/articles',
//     '/articles/:id',
//     // Ajout endpoints publics si nécessaire
//   ];
//   constructor(private authService: AuthService) { }

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const authToken = localStorage.getItem('auth_token');

//     // Vérifier si l'URL de la requête est dans la liste des endpoints publics
//     const isPublicEndpoint = this.publicEndpoints.some((endpoint) => {
//       return request.url.startsWith(endpoint);
//     });

//     if (authToken && !isPublicEndpoint) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${authToken}`,
//         },
//         withCredentials: true,
//       });
//     }

//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401 || error.status === 403) {
//           // Unauthorized or forbidden response, redirect to login page or handle as needed
//           console.error('Unauthorized or forbidden request:', error);
//           this.authService.logout(); // Example: Logout user on unauthorized access
//         }
//         return throwError(error);
//       })
//     );
//   }
// }
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('auth_token');


    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si erreur 401 (non autorisé), rediriger vers la page de connexion
        if (error.status === 401) {
          this.cookieService.delete('auth_token');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');

          // Rediriger vers la page de connexion
          this.router.navigate(['/authentication']);
        }

        return throwError(() => error);
      })
    );
  }

}
