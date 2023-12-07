import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-splash-page',
  templateUrl: './splash-page.component.html',
  styleUrls: ['./splash-page.component.scss'],
})
export class SplashPageComponent implements OnInit {
  constructor(private router: Router) {}
  shakeDoors = false;
  openDoors = false;
  fogEffect = false;
  

  ngOnInit(): void {
 

    setTimeout(() => {
      this.shakeDoors = true;
    }, 1000);
    setTimeout(() => {
      this.openDoors = true;
    }, 2000);

    this.fogEffect = true;

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 3000);
  }
}
