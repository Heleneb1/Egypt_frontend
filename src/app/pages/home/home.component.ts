import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  fogEffect = true;
  glow = true;
  isLoaded = false;
  isConnect = false;

  constructor(private authService: AuthService) { }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.isConnect = true;

      setTimeout(() => {
        this.isLoaded = true;
        this.fogEffect = false;
      }, 4000);
    } else {
      this.isLoaded = true;
      this.fogEffect = false;
      this.glow = false;
    }
  }

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;
    video.muted = true; // sécurité pour autoplay
    video.play().catch(err => {
      console.warn('Autoplay bloqué par le navigateur', err);
    });
  }
}
