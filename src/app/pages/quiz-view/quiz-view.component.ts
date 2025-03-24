import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.scss']
})
export class QuizViewComponent implements OnInit {
  quizzes: any[] = [];
  currentRating!: number;
  quiz: any;
  quizId: any;
  defaultImage: string = 'assets/images/Gizeah.jpg';
  isUserConnected: boolean = false;


  constructor(private quizService: QuizService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserConnected().subscribe((user: any) => {
      this.isUserConnected = !!user;
      if (this.isUserConnected) {
        this.getQuizzes();
      }
    });
  }

  getQuizzes(): void {
    this.quizService.getQuizzes().subscribe((quizzes: any) => {
      this.quizzes = quizzes.filter((quiz: any) => quiz.archive !== true);
      console.info(this.quizzes);
    });
  }

  selectedQuizById(id: string) {
    this.quizId = id;
    this.router.navigate(['/quiz', id]);
  }

  showRating() {
    this.currentRating = this.quiz.rating;
    console.info(this.currentRating)
  }
}
