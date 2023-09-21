import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})
export class QuizViewComponent implements OnInit {
  quizzes: any[] = [];
  quizData: any;
  currentRating!: number;
  isVoteModified: boolean = false;
  quiz: any;
  quizId: any;
  constructor(private quizService: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes(): void {
    // Get quizzes from API
    // this.quizzes = [...]
    this.quizService.getQuizzes().subscribe((quizzes: any) => {
      this.quizzes = quizzes;
    });
  }
  selectedQuizById(id: string) {
    this.quizId = id;
    console.log(id);
    this.router.navigate(['/quiz', id]);
  }
  // selectPromotionById(promoId: string): void {
  //   this.selectedPromotionId = promoId;
  // }

  saveVote() {
    if (this.currentRating >= 0 && this.currentRating <= 5) {
      this.quizService.addRating(this.quizId, this.currentRating);
      this.isVoteModified = false;
      this.quiz.rating = this.currentRating;

      alert(`Vous avez évalué cette promotion à ${this.currentRating} étoiles`);
    }
  }
  // saveVote() {
  //   if (this.currentRating >= 0 && this.currentRating <= 5) {
  //     this.promotionsService.addRating(this.promotionId, this.currentRating, this.authorId);
  //     this.isVoteModified = false;
  //     this.promotion.rating = this.currentRating;

  //     alert(`Vous avez évalué cette promotion à ${this.currentRating} étoiles`);
  //   }
  // }
  onRatingChanged(rating: number) {
    this.currentRating = rating;
    this.isVoteModified = true;

  }
}
