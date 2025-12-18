import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

//TODO revoevoir loading
export class UserProfileComponent implements OnInit {
  userData: any;
  userConnected: boolean = false;

  constructor(private authService: AuthService, private cookieService: CookieService) { }

  ngOnInit() {
    const token = this.cookieService.get('auth_token');

    if (!token) {
      this.authService.logout();
    } else {
      this.authService.getUserConnected().subscribe((user: any) => {
        if (user) {
          this.userData = user;
          this.userConnected = true;
        } else {
          this.userConnected = false;
        }
      });
    }
  }

}
