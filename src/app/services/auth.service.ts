import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor (private http: HttpClient, private cookieService: CookieService, private cookieConsentService: NgcCookieConsentService) { }
  logout() {
    this.cookieService.delete('token');
    this.cookieConsentService.destroy();
  }

  isLoggedIn() {


    return this.cookieService.check('token');
  }
  setUserToken(token: string) {
    const expires = 1; // par exemple, pour une expiration d'un jour
    const path = '/authentication'; // spécifiez le chemin approprié
    const domain = 'egypt-api.lesmysteresdelegypteantique.fr'; // spécifiez le domaine approprié
    const secure = true;
    const sameSite = 'None';

    // Utilisez ngx-cookie-service pour définir le cookie
    this.cookieService.set('token', token, expires, path, domain, secure, sameSite);

  }

  getUserToken(): string | null {
    const token = this.cookieService.get('token');

    const payload: any = jwtDecode(token);
    return payload?.userId;
  }

  getUserConnected(): Observable<string> {
    const userId = this.getUserToken();
    const userConnectedUrl = environment.apiUrl + `/users/${userId}`;
    return this.http.get<string>(userConnectedUrl, { withCredentials: true });
  }
  getUserRole(): Observable<string> {
    return this.getUserConnected().pipe(
      map((userData: any) => {
        return userData.role;
      })
    );
  }
}
