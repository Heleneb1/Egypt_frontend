import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { BadgesService } from 'src/app/services/badges.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss'],
})
export class QuizDetailsComponent {
  quiz: any = [];
  quizId: any;
  userId: any;
  rating: any
  isVoteModified: boolean = false;
  currentRating: number = 3.5;
  questionsMap: any = [];
  progress: number = 0;
  totalNumberOfQuestions: number = 0;
  numberOfAnsweredQuestions: number = 0;
  questionRemoved = false;
  showModal: boolean = false;
  badgeId: string = '';
  userConnected: any;
  isLoaded = false;
  creationDate: any = new Date();
  score!: number;


  constructor(
    private quizService: QuizService,
    private articlesService: ArticlesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private badgeService: BadgesService
  ) {
    this.auth.getUserConnected().subscribe((user: any) => {
      this.userConnected = user;
      this.userId = this.userConnected.id;
    });
  }
  formatDate(dateString: string | null): void {
    this.creationDate = new Date(this.quiz.creationDate);
    console.info('Date de création:', this.creationDate);
  }
  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
    this.route.paramMap.subscribe((params) => {
      this.quizId = params.get('id');
      this.quizService.getQuizById(this.quizId).subscribe((quiz) => {
        this.quiz = quiz;
        this.rating = this.quiz.rating;

        this.formatDate(this.quiz.creationDate);
        this.userService.getUsers;
        this.articlesService
          .getArticleContent(this.quiz.article)
          .subscribe((article: any) => {
            this.quiz.article = article;
          });

        this.badgeService
          .getBadgeContent(this.quiz.badge)
          .subscribe((badge: any) => {
            this.quiz.badge = badge;
          });
        console.log(this.quiz)

        this.quiz.questionsIds.forEach((questionId: string) => {
          this.quizService
            .getQuestionContent(questionId)
            .subscribe((question: any) => {
              question.selectedOption = '';
              this.questionsMap.push(question);
              this.totalNumberOfQuestions = this.questionsMap.length;
            });
        });
      });
    });
  }

  onOptionSelected(questionId: string, event: Event) {
    //verification de event.target nonnull et a une propriété value
    if (event.target && 'value' in event.target) {
      let selectedOption = (<HTMLInputElement>event.target).value;
      let question = this.questionsMap.find(
        (question: { id: string }) => question.id === questionId
      );
      if (question) {
        question.selectedOption = selectedOption;
      }
    }
  }
  removeAnswer(question: any): void {
    const wasAnswered = !!question.selectedOption; // Vérifie si une réponse existait

    if (wasAnswered) {
      question.selectedOption = ''; // Annule la réponse
      this.numberOfAnsweredQuestions--; // Décrémente le compteur des réponses
      console.info(
        'Réponse supprimée. Nombre de questions répondues :',
        this.numberOfAnsweredQuestions
      );
    }

    this.progressBarElem(); // Mettre à jour la barre de progression
  }
  toggleAnswer(question: any, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.answerQuestion(); // Ajoute la réponse
    } else {
      this.removeAnswer(question); // Retire la réponse si décoché
    }
  }

  saveVote() {
    if (this.currentRating >= 0 && this.currentRating <= 5) {
      this.quizService.addRating(this.quizId, this.currentRating);
      this.isVoteModified = false;
      this.quiz.rating = this.currentRating;
      this.toastr.success(
        `Vous avez évalué ce Quiz à ${this.currentRating} étoiles`
      );
    }
  }
  onRatingChanged(rating: number) {
    this.currentRating = rating;
    this.isVoteModified = true;
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
  calculateScore() {
    this.score = 0;
    if (!this.questionsMap || this.questionsMap.length === 0) {
      this.toastr.warning("Pas de questions à évaluer 🧐!");
      return;
    }

    for (const question of this.questionsMap) {
      const userAnswer = question.selectedOption ?? null;


      if (
        userAnswer &&
        (userAnswer === question.answer1 || userAnswer === question.answer2)
      ) {
        this.score++;
        console.log("✅ Bonne réponse !");
      } else {
        console.log("❌ Mauvaise réponse ou pas de réponse.");
      }
    }

    console.log("Score final :", this.score);

    if (this.score === 0) {
      this.toastr.info("Vous n'avez donné aucune bonne réponse 😔 !");
      return;
    }

    if (this.questionsMap.length === 0) {
      console.error("Erreur : division par zéro évitée !");
      return;
    }

    let percentage = Math.round((this.score / this.questionsMap.length) * 100);

    console.log("Pourcentage de bonnes réponses :", percentage + "%");

    if (isNaN(percentage) || percentage === 0) {
      this.toastr.info("Vous n'avez donné aucune bonne réponse 😔 !");
      return;
    }

    if (percentage >= 80) {
      this.toastr.success(
        `Félicitations ! Vous avez obtenu un score supérieur à 80% 🎉.\n
         Votre score : ${percentage}% de bonnes réponses.`
      );
      this.showModal = true;
    } else {
      this.toastr.warning(
        `Continuez à travailler pour améliorer votre score 😉. ${percentage}% de bonnes réponses.`
      );
    }
  }

  answerQuestion(): void {
    const userProgress = (this.numberOfAnsweredQuestions / this.totalNumberOfQuestions) * 100;
    console.info("Progression de l'utilisateur :", userProgress);

    if (!this.questionRemoved) {
      this.numberOfAnsweredQuestions++;
      console.info('Nombre de questions répondues :', this.numberOfAnsweredQuestions);
    }

    if (this.questionRemoved) {
      if (this.numberOfAnsweredQuestions > 0) {
        this.numberOfAnsweredQuestions--;
        console.info('Nombre de questions répondues après suppression :', this.numberOfAnsweredQuestions);
      } else {
        console.warn("Aucune question à retirer !");
      }
    }
    this.progressBarElem();
  }

  progressBarElem(): void {
    if (this.totalNumberOfQuestions > 0) {
      this.progress = (this.numberOfAnsweredQuestions / this.totalNumberOfQuestions) * 100;
    } else {
      console.error("Le nombre total de questions est égal à zéro !");
      this.progress = 0;
    }

    console.info('Progression calculée :', this.progress);
    console.info('Nombre total de questions :', this.totalNumberOfQuestions);
  }

  awardBadgeToUser() {
    if (this.score >= 80) {
      this.userService
        .awardBadgeToCurrentUser(this.userId, this.badgeId)
        .subscribe();
      console.info('badge après', this.badgeId);
      this.closeModal();
    }
  }
}

