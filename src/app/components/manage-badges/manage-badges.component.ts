import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BadgesService } from 'src/app/services/badges.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-manage-badges',
  templateUrl: './manage-badges.component.html',
  styleUrls: ['./manage-badges.component.scss']
})
export class ManageBadgesComponent implements OnInit {
  @Output() badgeSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() quizId: string = '';
  isSelectedBadge: any;
  badge: any;
  badgesArray: any[] = [];
  badges: any[] = [];
  badgesOpen = false;
  name: string = '';
  description: string = '';
  image: string = '';
  showBadgeForm: boolean = false;
  selectedBadge: any;

  constructor (private quizService: QuizService, private badgesService: BadgesService) { }

  ngOnInit(): void { }

  selectBadgeEmit(badge: any) {
    this.badgeSelected.emit(badge);
  }

  createBadgeForm() {
    this.name = '';
    this.description = '';
    this.image = '';
  }

  createBadge() {
    this.showBadgeForm = !this.showBadgeForm;
  }

  onCreateBadge() {
    const newBadge = {
      name: this.name,
      description: this.description,
      image: this.image,
    };

    this.quizService.createBadge(newBadge).subscribe((response: any) => {
      console.log("Nouveau badge créé :", response);
      this.createBadgeForm();
    });
  }

  getBadge(): void {
    this.badgesOpen = !this.badgesOpen;

    if (this.badgesOpen) {
      this.quizService.getBadges().subscribe((badges: any) => {
        this.badges = badges;
        console.log(badges);
      });
    }
  }

  selectBadge(badgeId: string) {
    this.isSelectedBadge = !this.isSelectedBadge;

    if (this.isSelectedBadge) {

      this.quizService.getBadgeById(badgeId).subscribe((badge: any) => {
        this.badgesArray = badge;
        console.log("ID du badge sélectionné : ", badgeId);
        this.selectBadgeEmit(badge);
      });
    }
  }
  deleteBadge(id: string) {

    this.badgesService.deleteBadge(id).subscribe(() => {
      this.getBadge();
      alert('Badge supprimé');
    });
  }
  addBadgeToQuiz(quizId: string, badgeId: string) {

    console.log("ID du quiz : ", quizId);
    console.log("ID du badge : ", badgeId);

    this.quizService.addBadgeToQuiz(quizId, badgeId).subscribe((response: any) => {
      console.log("Badge ajouté au quiz avec succès", response);

    });
  }
}
