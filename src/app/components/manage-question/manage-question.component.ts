import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuizQuestion } from 'src/app/models/quiz-question';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.scss']
})
export class ManageQuestionComponent implements OnInit {
  constructor (private quizService: QuizService) { }
  @Output() questionsSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() categorySelected: EventEmitter<any> = new EventEmitter<any>();
  questions: any = {};
  question_title: string = '';
  option_1: string = '';
  option_2: string = '';
  option_3: string = '';
  right_answer: string = '';
  right_answer_2: string = '';
  category: string = '';
  showQuestionForm: boolean = false;
  isSelectingQuestions: boolean = false;
  categoriesOptions: string[] = [];
  selectedCategory: string = '';
  question: any;
  quiz: any;
  questionsToAdd: any[] = [];
  selectCategory: string = '';
  existingQuestion!: QuizQuestion;
  showUpdateForm = false;


  ngOnInit() {
    this.loadCategories();
  }
  selectQuestions(selectedQuestionIds: string[]) {

    this.isSelectingQuestions = !this.isSelectingQuestions;
    if (this.isSelectingQuestions) {
      this.quizService.getAllQuestionByCategory(this.category).subscribe((questions: any) => {
        this.questions = selectedQuestionIds;
        console.log(selectedQuestionIds);
        this.selectQuestionsEmit(questions);
      });
    }
  }
  selectQuestionsEmit(questions: any) {
    this.questionsSelected.emit(questions);
  }
  selectCategoryEmit(category: string) {
    this.categorySelected.emit(category);
  }

  editQuestion(question: QuizQuestion) {
    this.existingQuestion = question;
    this.question_title = question.questionTitle;
    this.option_1 = question.option1;
    this.option_2 = question.option2;
    this.option_3 = question.option3;
    this.right_answer = question.rightAnswer;
    this.right_answer_2 = question.rightAnswer2;
    this.category = question.category;
    this.showUpdateForm = true;
    console.log(this.existingQuestion);

  }


  createQuestion() {
    this.question_title = '';
    this.option_1 = '';
    this.option_2 = '';
    this.option_3 = '';
    this.right_answer = '';
    this.right_answer_2 = '';
    this.category = '';

    this.showQuestionForm = !this.showQuestionForm;
  }
  onCreateQuestion() {
    const newQuestion = {
      question_title: this.question_title,
      option_1: this.option_1,
      option_2: this.option_2,
      option_3: this.option_3,
      right_answer: this.right_answer,
      right_answer_2: this.right_answer_2,
      category: this.category,
    };

    this.quizService.createQuestion(newQuestion).subscribe((response: any) => {
      console.log("Nouvelle question créée :", response);

    });
  }
  getQuestionByCategory(category: string) {
    this.quizService.getAllQuestionByCategory(category).subscribe((questions: any) => {
      this.questions = questions;
      console.log("categorie", category);
    });
  }

  addQuestionToQuiz(quizId: string, category: string) {
    this.quizService.getAllQuestionByCategory(category).subscribe((questions: any) => {
      this.questionsToAdd = questions;
      console.log(questions);
    });
  }
  selectQuestionsByCategory() {
    if (this.selectCategory) {
      this.quizService.getAllQuestionByCategory(this.selectCategory).subscribe((questions: any) => {
        this.questions = questions;
        this.selectCategoryEmit(this.selectCategory); // Passer la catégorie sélectionnée
        this.selectQuestionsEmit(this.questions); // Passer les questions
        console.log("Les questions", this.questions);
        console.log("categorie", this.selectCategory);
      });
    }
  }
  questionSelection(question: any) {
    question.selected = !question.selected;
  }
  loadCategories() {
    this.quizService.getCategories().subscribe(
      (categories: string[]) => {
        this.categoriesOptions = categories;
      },
      (error) => {
        console.error("Une erreur s'est produite lors du chargement des catégories :", error);
      }
    );
  }
  onCategoryChange(selectedCategory: string) {
    this.quizService.getQuestionsByCategory(selectedCategory).subscribe(
      (questions: any[]) => {
        this.questions = questions;
        this.selectCategoryEmit(this.selectCategory); // Passer la catégorie sélectionnée
        this.selectQuestionsEmit(this.questions); // Passer les questions
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
  }

  deleteQuestion(id: string) {
    this.quizService.deleteQuestion(id).subscribe(() => {
      this.getQuestionByCategory(this.category);
      alert('Question supprimée');
    });
  }
  //TODO revoir la méthode updateQuestion
  updateQuestion(existingQuestion: any, updatedQuestion: any) {
    this.quizService.updateQuestion(existingQuestion, updatedQuestion).subscribe(() => {
      this.getQuestionByCategory(this.category);
      console.log(existingQuestion);

      alert('Question modifiée');
      this.ngOnInit();
    });
  }

}

