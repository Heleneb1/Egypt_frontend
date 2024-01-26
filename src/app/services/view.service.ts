import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src//environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  private apiUrl = environment.apiUrl + '/coordinates';

  constructor (private http: HttpClient) { }

  getCoordinatesFromDatabase(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }
}
