import { Component, EventEmitter, Output } from '@angular/core';
import { BadgesService } from 'src/app/services/badges.service';
import { QuizService } from 'src/app/services/quiz.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.scss']
})
export class ManageQuizComponent {
  @Output() quizSelected: EventEmitter<any> = new EventEmitter<any>();
  existingQuiz: any;
  editingQuiz: any = null;
  updateQuizForm!: FormGroup;
  showQuestions: boolean = false;
  allQuestions: any[] = [];
  // questionTitles: any;

  constructor (
    private quizService: QuizService, private badgesService: BadgesService, private toastr: ToastrService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.updateQuizForm = this.formBuilder.group({
      title: [''],
      difficulty: [''],
      content: [''],
      picture: [''],

    });
  }
  quizzes: any[] = [];
  showQuizForm = false;
  selectedQuestions: any[] = [];
  newTitle: string = '';
  newContent: string = '';
  newDifficulty: string = '';
  newPicture: string = '';
  isArchived: boolean = false;
  defaultImage: string = 'assets/images/Gizeh.jpg'
  isSelectedQuiz: boolean = false;
  quiz: any;
  questions: any = {};
  quizzesOpen = false;
  badgeId: string = '';
  quizId: string = '';
  selectedQuiz!: string;
  category: string = '';
  selectedQuizId!: string;
  searchTitle: any;

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
      // alert('Etat du Quiz modifié ' + this.existingQuiz.title + ' : ' + (this.existingQuiz.archive ? 'Archivé' : 'Non archivé'));
      this.toastr.success('Etat du Quiz modifié ' + this.existingQuiz.title + ' : ' + (this.existingQuiz.archive ? 'Archivé' : 'Non archivé'), 'Modification');
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
  searchQuiz() {
    if (this.searchTitle) {
      this.quizService.getQuizByTitle(this.searchTitle).subscribe((quizzes: any) => {
        this.quizzes = quizzes;
        console.log("quizzes", this.quizzes);
        this.reset();
      });
    } else {
      this.getQuiz();
    }
  }
  reset() {
    this.searchTitle = '';
  }
  seeQuestionsOfQuiz() {
    this.showQuestions = !this.showQuestions;
    if (this.showQuestions) {
      if (this.selectedQuizId) {
        this.quizService.getQuizQuestions(this.selectedQuizId).subscribe((questions: any) => {
          this.allQuestions = questions; // Stockez les questions dans le tableau allQuestions
          console.log("questions", questions);
        });
      }
    }
  }
  deleteQuestionFromQuiz(questionId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question du quiz ?')) {
      this.quizService.deleteQuestion(questionId).subscribe(() => {
        this.getQuestionContentForQuiz(this.quizId);
        alert('Question supprimée');
      });
    }
  }


  onCreateQuiz() {
    const newQuiz = {
      title: this.newTitle,
      difficulty: this.newDifficulty,
      content: this.newContent,
      picture: this.newPicture,
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
    this.newPicture = '';
    this.isArchived = false;
  }


  deleteQuiz(id: string) {
    this.quizService.deleteQuiz(id).subscribe(() => {
      this.getQuiz();

      this.toastr.success('Quiz supprimé', 'Suppression');
    });
  }
  updateQuiz(id: string, updatedQuiz: any) {
    console.log("id", id);
    console.log("updatedQuiz", updatedQuiz);

    this.editingQuiz.title = updatedQuiz.title;
    this.editingQuiz.difficulty = updatedQuiz.difficulty;
    this.editingQuiz.content = updatedQuiz.content;
    this.editingQuiz.isArchived = updatedQuiz.isArchived;
    this.editingQuiz.picture = updatedQuiz.picture;

    this.quizService.updateQuiz(id, this.editingQuiz).subscribe(() => {
      this.getQuiz();
      this.toastr.success('Quiz modifié', 'Modification');

    });
  }


  editQuiz(quiz: any) {
    this.editingQuiz = true;
    this.editingQuiz = { ...quiz };
  }


  cancelEdit() {
    this.editingQuiz = null;
  }
  // addBadgeToQuiz(quizId: string, badgeId: string) {
  //   console.log("quizId", quizId);
  //   console.log("badgeId", badgeId);

  //   this.quizService.addBadgeToQuiz(quizId, badgeId).subscribe((response: any) => {
  //     console.log("Badge ajouté au quiz avec succès", response);
  //   });
  // }

}
