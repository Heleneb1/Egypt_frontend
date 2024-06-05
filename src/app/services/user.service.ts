import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src//environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  @Output() registrationStatus = new EventEmitter<{
    success: boolean;
    submitted: boolean;
  }>();
  formSubmitted = false;
  awardBadgeToCurrentUser(badgeId: any, userId: any) {
    return this.httpClient.put<any>(
      environment.apiUrl + `/users/${userId}/badges/${badgeId}`,
      {}
    );
  }

  getData() {
    throw new Error('Method not implemented.');
  }
  private userData = environment.apiUrl + '/users';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getUsers(): Observable<any> {
    return this.httpClient.get(this.userData);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.userData}/${userId}`;
    return this.httpClient.get<any>(url);
  }
  getUserName(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(
      map((user: any) => `${user.firstname} ${user.lastname}`)
    );
  }
  getUserAvatar(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(map((user: any) => `${user.avatar}`));
  }
  getUserEmail(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(
      map((user: any) => {
        return `${user.email}`;
      })
    );
  }

  getUserAvatarForComment(userId: string): Observable<Blob> {
    return this.httpClient.get(
      `${environment.apiUrl}/users/avatar/user/${userId}`,
      { responseType: 'blob' }
    );
  }

  getUserAvatarComment(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(map((user: any) => `${user.favatar}`));
  }
  updateUserById(userId: string, body: { promotionId: any } | undefined) {
    const url = environment.apiUrl + `/users/${userId}`;
    return this.httpClient.put(url, body);
  }
  acceptation(userId: string, body: { isAccepted: boolean }): Observable<any> {
    const url = `${environment.apiUrl}/users/${userId}`;
    return this.httpClient.put(url, body);
  }
  registerUser(user: any): Observable<any> {
    return this.httpClient
      .post(environment.apiUrl + '/api/auth/register', user, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === 200 || response.status === 201) {
            this.registrationStatus.emit({
              success: true,
              submitted: this.formSubmitted,
            });
          } else if (response.status >= 400) {
            this.registrationStatus.emit({
              success: false,
              submitted: this.formSubmitted,
            });
          }

          return response;
        })
      );
  }

  getAvatar(avatarFilename: string) {
    return this.httpClient.get(
      environment.apiUrl + `/users/avatar/${avatarFilename}`,
      { responseType: 'blob' }
    );
  }

  uploadAvatar(selectedFile: File | null, userId: string) {
    if (selectedFile) {
      const fd = new FormData();
      fd.append('avatar', selectedFile, selectedFile?.name);
      return this.httpClient.put<any>(
        environment.apiUrl + `/users/${userId}/avatar`,
        fd
      );
    } else {
      return;
    }
  }

  updateBio(userId: string, updatedBiography: string) {
    const url = environment.apiUrl + `/users/${userId}/update-bio`;

    return this.httpClient.put(url, updatedBiography);
  }
  deleteUsers(id: any) {
    return this.httpClient.delete(environment.apiUrl + `/users/${id}`);
  }
}
