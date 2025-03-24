import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isLoggedIn()
      ? this.authService.getUserRole().pipe(
        map((userRole) => {


          if (userRole === 'ADMIN') {
            return true;
          } else {
            this.router.navigate(['/authentication']);
            return false;
          }
        })
      )
      : of(false).pipe(tap(() => this.router.navigate(['/authentication'])));
  }
}
