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
    // Réinitialisez les champs du formulaire
    this.name = '';
    this.description = '';
    this.image = '';
  }

  createBadge() {
    // Affiche/masque le formulaire de création de badge
    this.showBadgeForm = !this.showBadgeForm;
  }

  onCreateBadge() {
    // Crée un nouveau badge en utilisant les valeurs du formulaire
    const newBadge = {
      name: this.name,
      description: this.description,
      image: this.image,
    };

    this.quizService.createBadge(newBadge).subscribe((response: any) => {
      console.log("Nouveau badge créé :", response);
      // Réinitialisez le formulaire après la création du badge
      this.createBadgeForm();
      // Vous pouvez également mettre à jour la liste des badges ici si nécessaire.
    });
  }

  getBadge(): void {
    // Affiche/masque la liste des badges
    this.badgesOpen = !this.badgesOpen;

    if (this.badgesOpen) {
      // Récupérez la liste des badges disponibles depuis le service
      this.quizService.getBadges().subscribe((badges: any) => {
        this.badges = badges;
        console.log(badges);
      });
    }
  }

  selectBadge(badgeId: string) {
    // Sélectionne un badge particulier pour afficher ses détails
    this.isSelectedBadge = !this.isSelectedBadge;

    if (this.isSelectedBadge) {
      // Récupérez les détails du badge à partir de son ID
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
    // Ajoute un badge à un quiz spécifique
    console.log("ID du quiz : ", quizId);
    console.log("ID du badge : ", badgeId);

    this.quizService.addBadgeToQuiz(quizId, badgeId).subscribe((response: any) => {
      console.log("Badge ajouté au quiz avec succès", response);
      // Vous pouvez également effectuer d'autres actions nécessaires ici.
    });
  }
}
