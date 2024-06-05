import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { NgcCookieConsentService } from 'ngx-cookieconsent';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;
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
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getUserToken(): { userId: string; scope: string } | null {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      return null;
    }

    try {
      const payload: any = jwtDecode(token);
      if (!payload || !payload.userId || !payload.scope) {
        console.error('Invalid token payload:', payload);
        return null;
      }

      return {
        userId: payload.userId,
        scope: payload.scope,
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  getUserConnected(): Observable<any> {
    const tokenInfo = this.getUserToken();

    if (!tokenInfo) {
      return of(null);
    }

    const userConnectedUrl = `${environment.apiUrl}/users/${tokenInfo.userId}`;
    return this.http.get<string>(userConnectedUrl, { withCredentials: true });
  }
  getUserRole(): Observable<string> {
    // Simulating an API call to get user role based on token
    const tokenInfo = this.getUserToken();
    if (tokenInfo && tokenInfo.scope) {
      // Replace this with actual API call if needed
      return of(tokenInfo.scope).pipe(
        map((scope) => {
          if (scope === 'ADMIN') {
            return 'ADMIN';
          } else {
            return 'USER';
          }
        }),
        catchError((error) => {
          console.error('Error fetching user role:', error);
          throw error;
        })
      );
    } else {
      return of('USER'); // Default role assumed
    }
  }
}
