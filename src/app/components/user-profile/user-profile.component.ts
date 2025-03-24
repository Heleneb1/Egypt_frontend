import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit() {

    const token = this.cookieService.get('auth_token');

    if (token === null) {
      this.authService.logout();
    } else {
      this.authService.getUserConnected().subscribe((data) => {
        this.userData = data;
      });
    }
  }

}
