import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FullPageService } from 'src/app/services/full-page.service';

@Component({
  selector: 'app-full-page-image',
  templateUrl: './full-page-image.component.html',
  styleUrls: ['./full-page-image.component.scss'],
})
export class FullPageImageComponent implements OnDestroy {
  imageUrl: string | null = null;
  private subscription: Subscription;

  constructor (private fullPageService: FullPageService) {
    this.subscription = this.fullPageService.getImageUrl().subscribe((url) => {
      this.imageUrl = url;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeFullPage(): void {
    this.fullPageService.setImageUrl('');
  }
}
