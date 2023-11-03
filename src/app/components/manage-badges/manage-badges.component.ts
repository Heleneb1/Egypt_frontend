import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BadgesService } from 'src/app/services/badges.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ToastrService } from 'ngx-toastr';

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
  badgeId: string = '';
  quizIdForBadge: string = '';
  selectedQuiz: string = '';


  constructor (private quizService: QuizService, private badgesService: BadgesService, private toastr: ToastrService) { }

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
    this.toastr.success('Badge créé', 'Création');
    this.getBadge();
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

    });
    this.toastr.success('Badge supprimé', 'Suppression');
  }
  addBadgeToQuiz(selectedQuiz: string, badgeId: string) {
    console.log("ID du quiz : ", selectedQuiz);
    console.log("ID du badge : ", badgeId);

    this.quizService.addBadgeToQuiz(selectedQuiz, badgeId).subscribe((response: any) => {
      if (response) {
        this.toastr.success('Badge ajouté au quiz', 'Ajout');
      }
      console.log("Badge ajouté au quiz avec succès", response);

    });
  }
}
