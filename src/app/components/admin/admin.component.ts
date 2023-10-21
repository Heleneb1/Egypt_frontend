import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  quiz: any = {};

  selectedBadge: any;
  selectedQuiz: any;
  selectedQuestions: string[] = [];
  selectedCategory: string = '';

  constructor (
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
  }


  addBadgeToQuiz() {
    console.log("quizId", this.selectedQuiz.id);
    console.log("badgeId", this.selectedBadge.id);
    this.quizService.addBadgeToQuiz(this.selectedQuiz.id, this.selectedBadge.id).subscribe((response: any) => {
      console.log("Badge ajouté au quiz avec succès", response);
    });
  }
  onQuestionsSelected(selectedQuestions: any) {
    this.selectedQuestions = selectedQuestions;
  }

  onCategorySelected(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
  }
  addSelectedQuestionsToQuiz(selectedCategory: string) {
    console.log("quizId", this.selectedQuiz.id);
    console.log("questions", this.selectedQuestions);
    console.log("category", selectedCategory);

    this.quizService.addQuestionByCategoryToQuiz(this.selectedQuiz.id, selectedCategory).subscribe((response: any) => {
      console.log("Questions successfully added to quiz", response);
    });
  }

}
