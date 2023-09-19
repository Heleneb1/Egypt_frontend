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

}
