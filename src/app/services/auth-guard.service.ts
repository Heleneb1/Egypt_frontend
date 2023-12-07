import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, of, tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthService, private router: Router) { }

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn() ? this.authService.getUserRole().pipe(
      map(userRole => {
        console.log("Role", userRole);

        if (userRole === 'USER') {

          return true;
        } else {
          this.router.navigate(['/authentication']);
          return false;
        }
      })
    ) : of(false).pipe(tap(() => this.router.navigate(['/authentication'])));
  }
}
