import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  fogEffect = true;
  glow = true;
  isLoaded = false;
  isConnect = false;

  constructor (private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.isConnect = true;

      setTimeout(() => {
        this.isLoaded = true;
        this.fogEffect = false;
      }, 4000);
    } else {
      // L'utilisateur est connecté, vous pouvez ajuster les propriétés en conséquence.
      this.isLoaded = true;
      this.fogEffect = false;
      this.glow = false;
    }

  }
}
