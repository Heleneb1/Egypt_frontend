import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StarService } from 'src/app/services/star.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  constructor (private starService: StarService, private authService: AuthService) { }

  @Input() totalStars = 5;
  @Input() rating = 3.5;


  stars: number[] = [];
  votedRating!: number;
  isVoteModified: boolean = false;
  userConnected!: boolean;

  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();


  ngOnInit() {
    this.stars = Array.from({ length: this.totalStars }, (_, index) => index + 1);
    this.votedRating = this.starService.votedRating;
    this.authService.getUserConnected().subscribe((user) => {
      if (user) {
        this.userConnected = true;
      }
    });

  }

  rate(star: number) {
    this.rating = star;
    this.isVoteModified = true;
    this.starService.votedRating = this.rating;

    this.ratingChanged.emit(this.rating);
  }

  isStarFilled(star: number): boolean {
    return star <= Math.floor(this.rating);
  }

  isHalfStarDisplayed(star: number): boolean {
    const floorValue = Math.floor(this.rating);
    return star === floorValue + 0.5 && this.rating % 1 !== 0;
  }

  getStarClass(star: number): string {
    if (star <= this.rating) {
      return 'fa fa-star';
    } else if (star === Math.ceil(this.rating) && this.rating % 1 !== 0) {
      return 'fa fa-star-half-o';
    } else {
      return 'fa fa-star-o';
    }
  }
}