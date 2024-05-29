import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService) {}
  ngOnInit() {
    if (localStorage.getItem('auth_token') === null) {
      this.authService.logout();
    } else {
      this.authService.getUserConnected().subscribe((data) => {
        this.userData = data;
      });
    }
  }
}
