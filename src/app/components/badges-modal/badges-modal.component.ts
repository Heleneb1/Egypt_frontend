import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BadgesService } from 'src/app/services/badges.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-badges-modal',
  templateUrl: './badges-modal.component.html',
  styleUrls: ['./badges-modal.component.scss']
})
export class BadgesModalComponent implements OnInit {
  badge: any = [];
  @Input() badgeId: any;
  @Input() userId: string = '';
  showModal: boolean = true;


  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  constructor (private router: Router, private badgesService: BadgesService, private userService: UserService) { }

  ngOnInit(): void {
    this.badgesService.getBadges().subscribe((data: any) => {
      this.badge = this.badgesService.getBadgesById(this.badgeId);
      this.getContent(this.badgeId);
    });
  }
  getContent(badgeId: any) {
    this.badgesService.getBadgeContent(badgeId).subscribe((badge: any) => {
      this.badge = badge;
    });
  }


  awardBadgeToUser(userId: any, badgeId: any) {
    this.userService.awardBadgeToCurrentUser(badgeId, userId).subscribe((data: any) => {
      this.router.navigate(['/profile']);
    });
    this.closeModal();
  }
}
