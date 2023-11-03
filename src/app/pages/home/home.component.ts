import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  fogEffect = true;
  glow = true;
  isLoaded = false;

  constructor () { }

  ngOnInit() {

    setTimeout(() => {
      this.isLoaded = true;
      this.fogEffect = false;
    }, 4000);
  }
}
