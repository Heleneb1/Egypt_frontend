import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  awardBadgeToCurrentUser(badgeId: any, userId: any) {
    return this.httpClient.put<any>(environment.apiUrl + `/users/${userId}/badges/${badgeId}`, {});
  }

  getData() {
    throw new Error('Method not implemented.');
  }
  private userData = environment.apiUrl + '/users';

  constructor (private httpClient: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.userData);
  }

  getUserById(userId: string): Observable<any> {
    const url = `${this.userData}/${userId}`;
    return this.httpClient.get<any>(url);
  }
  getUserName(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(map((user: any) => `${user.firstname} ${user.lastname}`));
  }
  getUserAvatar(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(map((user: any) => `${user.avatar}`));
  }
  getUserEmail(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(
      map((user: any) => {
        console.log(userId);
        console.log(user.email);
        return `${user.email}`;
      })
    );
  }


  getUserAvatarForComment(userId: string): Observable<Blob> {
    return this.httpClient.get(`${environment.apiUrl}/users/avatar/user/${userId}`, { responseType: 'blob' });
  }

  getUserAvatarComment(userId: string): Observable<string> {
    return this.getUserById(userId).pipe(map((user: any) => `${user.favatar}`));
  }
  updateUserById(userId: string, body: { promotionId: any } | undefined) {
    const url = environment.apiUrl + `/users/${userId}`;
    return this.httpClient.put(url, body);
  }

  getAvatar(filename: string): Observable<Blob> {
    return this.httpClient.get(environment.apiUrl + `/users/avatar/${filename}`, { responseType: 'blob' });
  }

  uploadAvatar(selectedFile: File | null, userId: string) {
    if (selectedFile) {
      const fd = new FormData();
      fd.append('avatar', selectedFile, selectedFile?.name);
      return this.httpClient.put<any>(environment.apiUrl + `/users/${userId}/avatar`, fd);
    } else {
      return;
    }
  }

  updateBio(userId: string, updatedBiography: string) {
    const url = environment.apiUrl + `/users/${userId}/update-bio`;
    console.log(url);

    return this.httpClient.put(url, updatedBiography);
  }
  deleteUsers(id: any) {
    return this.httpClient.delete(environment.apiUrl + `/users/${id}`);
  }


}