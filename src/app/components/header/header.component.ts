import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isConnected = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }

  ngOnInit(): void {
    this.isConnected = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isConnected = false;
    this.router.navigate(['/home']);
    this.toastr.success(
      'Vous venez de vous déconnecter avec succes,\nà bientôt...',
      'Déconnexion'
    );
  }

  redirectToProfile() {
    if (this.isConnected) {
      this.router.navigate(['/profile']);
    }
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
