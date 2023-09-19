import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any;
  constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService) { }
  ngOnInit() {
    if (this.cookieService.get('token') === '') {
      this.authService.logout();
    } else {
      this.authService.getUserConnected().subscribe((data) => {
        this.userData = data;
      });
    }
  }
}
