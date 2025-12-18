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

  private publicEndpoints = [
    '/topics',
    '/answers',
    '/articles',
  ];

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
        const isPublic = this.publicEndpoints.some(endpoint =>
          request.url.includes(endpoint)
        );

        // Redirection uniquement si ce n'est pas un endpoint public
        if (error.status === 401 && !isPublic) {
          this.cookieService.delete('auth_token');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          this.router.navigate(['/authentication']);
        }

        return throwError(() => error);
      })
    );
  }
}
