import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isConnected = false;
  private authSubscription!: Subscription;

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
    // S'abonner aux changements d'état de connexion
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isConnected = isLoggedIn;
    });

    // Vérifier l'état initial
    this.isConnected = this.authService.isUserLoggedIn();
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
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
