import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-networks',
  templateUrl: './social-networks.component.html',
  styleUrls: ['./social-networks.component.scss']
})
export class SocialNetworksComponent {
  constructor(private router: Router) { }
  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
