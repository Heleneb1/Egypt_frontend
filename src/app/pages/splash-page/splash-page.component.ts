import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.scss'],
})
export class SplashPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      const leftDiv = document.querySelector('.left-div');
      const rightDiv = document.querySelector('.right-div');

      if (leftDiv instanceof HTMLElement) {
        leftDiv.style.transform = 'translateX(-100%)';
      }

      if (rightDiv instanceof HTMLElement) {
        rightDiv.style.transform = 'translateX(100%)';
      }
    }, 2000);
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 4000);
  }
}
