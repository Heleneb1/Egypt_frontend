import { Component, Host, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn!: boolean;
  isConnected = false;
  


  constructor(private router: Router, private authservice: AuthService) {
    this.isConnected = false; // Assurez-vous que isConnected est initialisé à false
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }
  ngOnInit(): void {}
  logged() {
      this.authservice.isLoggedIn();
      this.isConnected = true;
      console.log(this.authservice.isLoggedIn());
  }
  logout() {
    this.authservice.logout();
    if (this.isConnected == true)
    alert('Vous venez de vous déconnecter avec succes')
    this.isConnected = false;
    this.router.navigate(['/home'])
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  // toggleConnection() {
  //   if (this.isConnected === this.authservice.isLoggedIn()) {
  //    this.logout();
  //   } else {
  //     this.router.navigate(['/authentication']);
  //   }
  // }
  
    @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.closeMenu();
  }
}