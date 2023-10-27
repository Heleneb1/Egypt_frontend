import { Component, Host, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isLoggedIn!: boolean;
  isConnected = false;



  constructor (private router: Router, private authservice: AuthService, private toastr: ToastrService) {
    this.isConnected = false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }
  ngOnInit(): void { }
  logged() {
    this.authservice.isLoggedIn();
    this.isConnected = true;
    console.log(this.authservice.isLoggedIn());
  }
  logout() {
    this.authservice.logout();
    if (this.isConnected == true)
      this.isConnected = false;
    this.router.navigate(['/home']);
    this.toastr.success('Vous venez de vous déconnecter avec succes,\nà bientôt...', 'Déconnexion');
    // alert('Vous venez de vous déconnecter avec succes')

  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.closeMenu();
  }
}