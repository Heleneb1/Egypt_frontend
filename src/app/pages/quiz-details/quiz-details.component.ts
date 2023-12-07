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
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent {
  quiz: any = [];
  quizId: any;
  userId: any;
  isVoteModified: boolean = false;
  currentRating: number = 3.5;
  questionsMap: any = [];
  progress: number = 0;
  totalNumberOfQuestions: number = 0;
  numberOfAnsweredQuestions: number = 0;
  showModal: boolean = false;
  badgeId: string = '';
  userConnected: any;
  isLoaded = false;
  // authorName: any;
  // questionTitles: any = [];
  // articlesMap: any = [];
  // questions: any;
  // userAnswers: string[] = [];
  // selectedOption!: any[];
  // badges: any[] = [];


  constructor (
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
      console.log("ID user", this.userId);
      console.log(this.userConnected);

    });
  }
  formatDate(date: string | null): string {
    if (date === null) {
      return '';
    }
    return this.datePipe.transform(date, 'dd MMMM yyyy') || '';
  }
  ngOnInit() {

    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
    this.route.paramMap.subscribe((params) => {
      this.quizId = params.get('id');
      this.quizService.getQuizById(this.quizId).subscribe((quiz) => {
        this.quiz = quiz;
        console.log("Quiz", this.quiz.id);

        console.log(this.quiz);
        this.userService.getUsers;
        console.log(this.userService.getUsers);
        this.articlesService.getArticleContent(this.quiz.article).subscribe((article: any) => {
          this.quiz.article = article;
          console.log(this.quiz.article.title);
        });

        this.badgeService.getBadgeContent(this.quiz.badge).subscribe((badge: any) => {
          this.quiz.badge = badge;
          console.log("badge", this.quiz.badge.name);

        });

        this.quiz.questionsIds.forEach((questionId: string) => {
          this.quizService.getQuestionContent(questionId).subscribe((question: any) => {
            question.selectedOption = '';
            this.questionsMap.push(question);
            this.totalNumberOfQuestions = this.questionsMap.length;
          });
          console.log("Hello", this.questionsMap);

        });
      },
      );

    });
  }

  onOptionSelected(questionId: string, event: Event) {
    //verification de event.target nonnull et a une propriété value
    if (event.target && 'value' in event.target) {
      let selectedOption = (<HTMLInputElement>event.target).value;
      let question = this.questionsMap.find((question: { id: string; }) => question.id === questionId);
      if (question) {
        question.selectedOption = selectedOption;
      }
    }
  }



  saveVote() {

    console.log(this.currentRating);
    console.log(this.quizId);


    if (this.currentRating >= 0 && this.currentRating <= 5) {
      this.quizService.addRating(this.quizId, this.currentRating);
      this.isVoteModified = false;
      this.quiz.rating = this.currentRating;
      this.toastr.success(`Vous avez évalué ce Quiz à ${this.currentRating} étoiles`);
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
    let score = 0;

    for (const question of this.questionsMap) {
      const userAnswer = question.selectedOption;
      console.log("reponse du joueur", userAnswer);
      console.log("bonne", question.answer1);
      console.log("Hello", this.questionsMap);

      if (userAnswer === question.answer1 || userAnswer === question.answer2) {
        console.log("Bonne réponse", question.answer1, question.answer2);
        score++;
      }
    }

    console.log("Score:", score);
    let percentage = (score / this.questionsMap.length) * 100;
    console.log("Pourcentage de bonnes réponses :", percentage + "%");
    if (percentage >= 80) {
      this.toastr.success(`Félicitations ! Vous avez obtenu un score supérieur à 80%. ${percentage}% de bonnes réponses.`);
      this.showModal = true;
    } else {
      this.toastr.warning(`Continuez à travailler pour améliorer votre score. ${percentage}% de bonnes réponses.`);
    }
  }

  answerQuestion(): void {
    const userProgress = (this.questionsMap.length / this.totalNumberOfQuestions) * 100;
    console.log("Progression de l'utilisateur :", userProgress);

    this.numberOfAnsweredQuestions++;
    console.log("Nombre de questions répondues :", this.numberOfAnsweredQuestions);

    this.progress = (this.numberOfAnsweredQuestions / this.totalNumberOfQuestions) * 100;
    console.log("Nombre de questions répondues :", this.numberOfAnsweredQuestions);
    console.log("Progression de l'utilisateur :", this.progress);
    console.log("Nombre total de questions :", this.totalNumberOfQuestions);
    let progressBar = document.getElementById('progressBar') as HTMLElement;
    progressBar.style.width = this.progress + '%';

  }

  awardBadgeToUser() {
    this.userService.awardBadgeToCurrentUser(this.userId, this.badgeId).subscribe();
    console.log("badge aprés", this.badgeId);
    this.closeModal();
  }

}

