import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private quizService: QuizService,
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
        this.userService.getUserName(this.quiz.authorId).subscribe((authorData) => {

          this.authorName = authorData;
        });
      });
    });
  }
  //   ngOnInit() {
  //     this.route.paramMap.subscribe((params) => {
  //       this.promotionId = params.get('id');

  //       this.promotionsService.getPromoById(this.promotionId).subscribe(
  //         (promotion) => {
  //           this.promotion = promotion;
  // this.promotion.description=this.promotion.description.replace(/<img[^>]*>/g,"");
  //           this.authorId = this.promotion.authorId;)}

  onRatingChanged(rating: number) {
    this.currentRating = rating;
    this.isVoteModified = true;

  }

  saveRating(rating: number) {
    this.quizService.addRating(this.quizId, rating);
    this.isVoteModified = false;
  }
}
