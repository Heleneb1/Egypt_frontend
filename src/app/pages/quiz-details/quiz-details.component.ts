import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

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
  authorName: any;
  questionTitles: any = [];
  questionsMap: any = [];
  articlesMap: any = [];

  constructor(
    private quizService: QuizService,
    private articlesService: ArticlesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) { }
  formatDate(date: string | null): string {
    if (date === null) {
      return '';
    }
    return this.datePipe.transform(date, 'dd MMMM yyyy') || '';
  }
  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.quizId = params.get('id');
      this.quizService.getQuizById(this.quizId).subscribe((quiz) => {
        this.quiz = quiz;
        console.log(this.quiz);
        //   this.userService.getUserName(this.quiz.authorId).subscribe((authorData) => {

        //     this.authorName = authorData;
        //     console.log('Auteur', this.quiz.authorId);

        //   });
        //   this.loadQuestionTitles();
        this.quiz.article = this.articlesService.getArticleContent(this.quiz.articleId);
        console.log(this.quiz.article);

        this.quiz.questionsIds.forEach((questionId: string) => {
          this.quizService.getQuestionContent(questionId).subscribe((question: any) => {
            this.questionsMap.push(question);
          });
          console.log("Hello", this.questionsMap);

        });
      },
      );
    });
  }
  // getQuestion(questionId: string) {
  //   this.quizService.getQuestionByTitle(questionId).subscribe((questionData) => {
  //     this.quiz.question_title = questionData;
  //   });
  // }
  // loadQuestionTitles(questionId?: any) {
  //   this.quizService.getQuestionByTitle(questionId).subscribe((questionData) => {
  //     // Stockez les titres des questions dans l'objet questionTitles avec l'ID de la question comme clé
  //     this.questionTitles = questionData;
  //     console.log("Hello", this.questionTitles);

  //   });
  // }

  onRatingChanged(rating: number) {
    this.currentRating = rating;
    this.isVoteModified = true;

  }

  saveRating(rating: number) {
    this.quizService.addRating(this.quizId, rating);
    this.isVoteModified = false;
  }
}
