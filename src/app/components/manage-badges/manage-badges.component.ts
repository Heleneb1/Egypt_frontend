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
        this.badges.sort((a, b) => a.name.localeCompare(b.name));
      });
    }
  }
  searchBadgeByName(name: string) {
    this.badgesService.getBadgeByName(name).subscribe((badge: any) => {
      this.badge = badge;
      this.badges = badge;
      this.reset();

    });
  }
  reset() {
    this.name = '';

  }
  selectBadge(badgeId: string) {
    this.isSelectedBadge = !this.isSelectedBadge;

    if (this.isSelectedBadge) {

      this.quizService.getBadgeById(badgeId).subscribe((badge: any) => {
        this.badgesArray = badge;
        this.selectBadgeEmit(badge);
      });
    }
  }
  deleteBadge(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce badge?')) {

      this.badgesService.deleteBadge(id).subscribe(() => {
        this.getBadge();

      });
      this.toastr.success('Badge supprimé', 'Suppression');
    }
  }
  addBadgeToQuiz(selectedQuiz: string, badgeId: string) {
    this.quizService.addBadgeToQuiz(selectedQuiz, badgeId).subscribe((response: any) => {
      if (response) {
        this.toastr.success('Badge ajouté au quiz', 'Ajout');
      }

    });
  }
}
