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

    const name = 'token';
    const expires = 1; // par exemple, pour une expiration d'un jour
    const path = '/'; // spécifiez le chemin approprié
    const domain = environment.cookieDomain;
    const secure = true;
    const sameSite = 'None';
    const HTTPOnly = false;

    // Utilisez ngx-cookie-service pour définir le cookie
    const cookie = this.cookieService.set('token', token, expires, path, domain, secure, sameSite);
    console.log('cookie', this.cookieService.get('token'));
    document.cookie = `${name}=${token}; expires=${expires}; path=${path}; domain=${domain}; secure=${secure}; samesite=${sameSite}; httponly=${HTTPOnly}`;
    console.log('cookie', document.cookie);
    console.log('Cookie set:', this.cookieService.get(name));


  }

  // getUserToken(): string | null {
  //   const token = this.cookieService.get('token');
  //   console.log("authservice", token);

  //   const payload: any = jwtDecode(token);
  //   return payload?.userId;
  // }
  getUserToken(): string | null {
    const token = this.cookieService.get('token');
    console.log("authservice", token);

    if (!token) {
      console.error("Token is undefined or not found.");
      return null;
    }

    try {
      const payload: any = jwtDecode(token);
      if (!payload || !payload.userId) {
        console.error("Invalid token payload:", payload);
        return null;
      }
      return payload.userId;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
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
