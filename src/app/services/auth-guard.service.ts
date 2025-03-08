import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/authentication']);
      return of(false);
    }

    return this.authService.getUserRole().pipe(
      map((userRole) => {
        if (userRole === 'USER') {
          return true;
        } else {
          this.router.navigate(['/authentication']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/authentication']);
        return of(false);
      })
    );
  }
}
