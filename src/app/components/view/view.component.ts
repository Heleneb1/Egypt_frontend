import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FullPageService } from 'src/app/services/full-page.service';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  latitude: number | undefined;
  longitude: number | undefined;
  data: any;
  isUserConnected: boolean = false;

  constructor (private route: ActivatedRoute, private viewService: ViewService, private fullPageService: FullPageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserConnected().subscribe((user: any) => {
      this.isUserConnected = !!user;
      if (this.isUserConnected) {
        this.viewService.getCoordinatesFromDatabase().subscribe((data) => {
          this.data = data;
          console.log(this.data);
          console.log(this.data.picture);
        });
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.latitude = parseFloat(params['lat']);
      this.longitude = parseFloat(params['lng']);
    });

  }
  openFullPage(imageUrl: string): void {
    this.fullPageService.setImageUrl(imageUrl);
  }

  openStreetView(link: string): void {
    window.open(link, '_blank');
  }
}
