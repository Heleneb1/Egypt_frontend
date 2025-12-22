import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token!: string;

  // BehaviorSubject pour gérer l'état de connexion
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private cookieConsentService: NgcCookieConsentService
  ) {
    // Vérifier l'état de connexion périodiquement
    this.setupTokenExpirationCheck();
  }

  // Vérifie si l'utilisateur est connecté initialement
  private checkLoginStatus(): boolean {
    const token = this.cookieService.get('auth_token');
    if (token) {
      try {
        const payload: any = jwtDecode(token);
        // Vérifier si le token est expiré
        const currentTime = Date.now() / 1000;
        return payload.exp > currentTime;
      } catch (error) {
        console.error('Erreur de décodage du token:', error);
        return false;
      }
    }
    return false;
  }

  // Configure une vérification périodique du token
  private setupTokenExpirationCheck() {
    // Vérifier toutes les minutes si le token est encore valide
    setInterval(() => {
      const isLoggedIn = this.checkLoginStatus();
      if (this.isLoggedInSubject.value !== isLoggedIn) {
        this.isLoggedInSubject.next(isLoggedIn);
      }
    }, 60000); // 60 secondes

    // Vérifier également au focus de la fenêtre
    window.addEventListener('focus', () => {
      const isLoggedIn = this.checkLoginStatus();
      if (this.isLoggedInSubject.value !== isLoggedIn) {
        this.isLoggedInSubject.next(isLoggedIn);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { email, password }).pipe(
      catchError(error => {
        console.error('Erreur de connexion', error);
        return throwError(() => new Error('Connexion impossible'));
      })
    );
  }

  logout() {
    try {
      this.cookieConsentService?.destroy?.();
    } catch (e) {
      console.warn("CookieConsent déjà détruit ou invalide");
    }

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.cookieService.delete('auth_token');
    this.isLoggedInSubject.next(false);
  }

  setToken(token: string) {
    this.token = token;

    try {
      // Décoder pour obtenir l'expiration
      const payload: any = jwtDecode(token);
      const expiresAt = new Date(payload.exp * 1000);

      // Définir le cookie avec la date d'expiration appropriée
      this.cookieService.set('auth_token', token, expiresAt, '/', undefined, true, 'Strict');

      // Mettre à jour l'état de connexion
      this.isLoggedInSubject.next(true);
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      // Fallback au cas où le décodage échoue
      this.cookieService.set('auth_token', token);
    }
  }

  isLoggedIn(): boolean {
    return this.cookieService.get('auth_token') !== null;
  }
  // Cette méthode retourne directement la valeur actuelle
  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUserToken(): { userId: string; scope: string } | null {
    const token = this.cookieService.get('auth_token');

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
