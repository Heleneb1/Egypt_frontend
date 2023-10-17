import { Component, EventEmitter, Output } from '@angular/core';
import { BadgesService } from 'src/app/services/badges.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.scss']
})
export class ManageQuizComponent {
  @Output() quizSelected: EventEmitter<any> = new EventEmitter<any>();
  existingQuiz: any;
  editingQuiz: any = null; constructor (
    private quizService: QuizService, private badgesService: BadgesService) { }
  ngOnInit() {

  }
  quizzes: any[] = [];
  showQuizForm = false;
  // questions: Question[] = [];
  // question: any;
  newTitle: string = '';
  newContent: string = '';
  newDifficulty: string = '';
  isArchived: boolean = false;
  // categories!: string; // Pour stocker les catégories récupérées depuis le serveur
  isSelectedQuiz: boolean = false;
  quiz: any;
  questions: any = {};
  quizzesOpen = false;
  // badgesArray: any[] = [];
  // badges: any[] = [];
  // badgesOpen = false;
  // name: string = '';
  // description: string = '';
  // image: string = '';
  // showBadgeForm: boolean = false;
  // selectedBadge: any;
  // badgeId: string = '';

  selectQuizEmit(quiz: any) {
    this.quizSelected.emit(quiz);
  }
  getQuiz(): void {
    this.quizzesOpen = !this.quizzesOpen;
    if (this.quizzesOpen) {
      this.quizService.getQuizzes().subscribe((quizzes: any) => {
        this.quizzes = quizzes;
        console.log(quizzes);

        this.quizzes.forEach((quiz: any) => {
          if (quiz.badge) {
            const badgeId = quiz.badge; // Récupérer le badgeId pour chaque quiz
            console.log("badgeId", badgeId);

            this.badgesService.getBadgeContent(badgeId).subscribe((badge: any) => {
              quiz.badgeContent = badge; // Stocker le contenu du badge dans l'objet quiz
              console.log("Badge", badge);
            });
          }
        });
      });
    }
  }
  archivedQuiz(quiz: any) {
    this.existingQuiz = quiz;
    this.existingQuiz.archive = !this.existingQuiz.archive; // Inverse l'état actuel de l'archive

    this.quizService.updateQuiz(this.existingQuiz.id, this.existingQuiz).subscribe(() => {
      this.getQuiz();
      alert('Etat du Quiz modifié ' + this.existingQuiz.title + ' : ' + (this.existingQuiz.archive ? 'Archivé' : 'Non archivé'));
    });
  }
  selectQuiz(quizId: string) {
    this.isSelectedQuiz = !this.isSelectedQuiz;
    if (this.isSelectedQuiz) {

      this.quizService.getQuizById(quizId).subscribe((quiz: any) => {
        this.quiz = quiz;
        console.log("id", quizId);
        this.selectQuizEmit(quiz);
      });
    }
  }
  getQuestionContentForQuiz(questionId: string): void {
    this.quizService.getQuestionContent(questionId).subscribe(
      (question: any) => {
        if (question) {
          this.questions[questionId] = question; // Stockez les données dans l'objet "questions" avec l'ID de la question comme clé
          console.log("Données de la question récupérées depuis le serveur :", this.questions[questionId]);
        } else {
          console.error("La réponse du serveur est vide ou indéfinie.");
        }
      },
      (error: any) => {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    );
  }
  deleteQuestionFromQuiz(questionId: string) {
    this.quizService.deleteQuestion(questionId).subscribe(() => {
      this.getQuestionContentForQuiz(this.quiz.id);
      alert('Question supprimée');
    });
  }


  onCreateQuiz() {
    const newQuiz = {
      title: this.newTitle,
      difficulty: this.newDifficulty,
      content: this.newContent,
      archive: this.isArchived,
    };

    this.quizService.createQuiz(newQuiz).subscribe((response: any) => {
      console.log("Nouveau quiz créé :", response);
      this.getQuiz();
      this.createQuizForm();
    });
  }
  createQuiz() {
    this.showQuizForm = !this.showQuizForm;
  }
  createQuizForm() {
    this.newTitle = '';
    this.newDifficulty = "";
    this.newContent = '';
    this.isArchived = false;
  }


  deleteQuiz(id: string) {
    this.quizService.deleteQuiz(id).subscribe(() => {
      this.getQuiz();
      alert('Quiz supprimé');
    });
  }
  updateQuiz(id: string, updatedQuiz: any) {
    this.quizService.updateQuiz(id, updatedQuiz).subscribe(() => {
      this.getQuiz();
      alert('Quiz modifié');
    });
  }
  editQuiz(quiz: any) {
    this.editingQuiz = true;
    this.editingQuiz = { ...quiz };
  }


  cancelEdit() {
    this.editingQuiz = null;
  }
  // createBadgeForm() {

  //   this.name = '';
  //   this.description = '';
  //   this.image = '';
  //   // this.badgesOpen = !this.badgesOpen;
  // }
  // createBadge() {
  //   this.showBadgeForm = !this.showBadgeForm;
  // }

  // onCreateBadge() {
  //   const newBadge = {
  //     name: this.name,
  //     description: this.description,
  //     image: this.image,
  //   };

  //   this.quizService.createBadge(newBadge).subscribe((response: any) => {
  //     console.log("Nouveau badge créé :", response);

  //   });
  // }
  // getBadge(): void {
  //   this.badgesOpen = !this.badgesOpen;
  //   if (this.badgesOpen) {
  //     this.quizService.getBadges().subscribe((badges: any) => {
  //       this.badges = badges;
  //       console.log(badges);
  //     });
  //   }
  // }
  // selectBadge(badgeId: string) {
  //   this.isSelectedBadge = !this.isSelectedBadge;
  //   if (this.isSelectedBadge) {

  //     this.quizService.getBadgeById(badgeId).subscribe((badge: any) => {
  //       this.badgesArray = badge;
  //       console.log("id", badgeId);
  //     });
  //   }
  // }
  // addBadgeToQuiz(quizId: string, badgeId: string) {
  //   console.log("quizId", quizId);
  //   console.log("badgeId", badgeId); // Vérifiez que badgeId est correct ici

  //   this.quizService.addBadgeToQuiz(quizId, badgeId).subscribe((response: any) => {
  //     console.log("Badge ajouté au quiz avec succès", response);
  //   });
  // }
}
