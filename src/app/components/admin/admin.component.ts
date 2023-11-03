import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private quizService: QuizService, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  onQuizSelected(selectedQuiz: any) {
    this.selectedQuiz = selectedQuiz;
  }
  onBadgeSelected(selectedBadge: any) {
    this.selectedBadge = selectedBadge;
  }



  // Ajoute un badge au quiz sélectionné
  addBadgeToQuiz(selectedQuiz: any, selectedBadge: any) {
    if (this.selectedQuiz && this.selectedBadge) {
      console.log("quizId", this.selectedQuiz);
      console.log("badgeId", this.selectedBadge);
      this.quizService.addBadgeToQuiz(this.selectedQuiz.id, this.selectedBadge.id).subscribe((response: any) => {
        this.toastr.success('Badge ajouté au quiz', 'Ajout');
      });
    }
  }

  // Met à jour les questions sélectionnées
  onQuestionsSelected(selectedQuestions: any) {
    this.selectedQuestions = selectedQuestions;
  }

  // Met à jour la catégorie sélectionnée
  onCategorySelected(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
  }

  // Ajoute les questions sélectionnées au quiz
  addSelectedQuestionsToQuiz(selectedCategory: string) {
    if (this.selectedQuiz && this.selectedQuestions.length > 0) {
      console.log("quizId", this.selectedQuiz.id);
      console.log("questions", this.selectedQuestions);
      console.log("category", selectedCategory);

      this.quizService.addQuestionByCategoryToQuiz(this.selectedQuiz.id, selectedCategory).subscribe((response: any) => {
        this.toastr.success('Questions ajoutées au quiz', 'Ajout');
      });
    }
  }
}
