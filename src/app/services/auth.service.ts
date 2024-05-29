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
  constructor(
    private http: HttpClient,

    private cookieConsentService: NgcCookieConsentService
  ) {}
  login(email: string, password: string) {
    const formData = {
      email: email,
      password: password,
    };
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/login`,
      formData
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.cookieConsentService.destroy();
  }

  isLoggedIn() {
    return localStorage.getItem('auth_token') !== null;
  }
  setUserToken(token: string) {
    const authToken = localStorage.getItem('auth_token');
  }

  getUserToken(): string | null {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      console.error('Token is undefined or not found.');
      return null;
    }

    try {
      const payload: any = jwtDecode(token);
      if (!payload || !payload.userId) {
        console.error('Invalid token payload:', payload);
        return null;
      }
      return payload.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
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
        const user = JSON.parse(userData); //transforme une chaîne de caractères formatée en JSON en un objet JavaScript.
        const userRole = user.role;

        return userRole;
      })
    );
  }
}
