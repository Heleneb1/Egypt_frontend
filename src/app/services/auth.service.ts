import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';
//dernière modif import { environment } from '../../environments/environment a la place de 'src/environments/environment/developpement
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

  getUserToken(): string | null {
    const token = this.cookieService.get('token');
    const payload: any = jwtDecode(token);
    return payload?.userId;
  }

  getUserConnected(): Observable<string> {
    const userId = this.getUserToken();
    const userConnectedUrl = environment.apiUrl + `/users/${userId}`;
    return this.http.get<string>(userConnectedUrl);
  }
  getUserRole(): Observable<string> {
    return this.getUserConnected().pipe(
      map((userData: any) => {
        return userData.role;
      })
    );
  }
}
