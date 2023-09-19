import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getData() {
    throw new Error('Method not implemented.');
  }
  private userData = environment.apiUrl + '/users';

  constructor(private httpClient: HttpClient) { }

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

  updateBio(id: string, user: any) {
    return this.httpClient.put<any>(environment.apiUrl + `/users/${id}`, user);
  }
}