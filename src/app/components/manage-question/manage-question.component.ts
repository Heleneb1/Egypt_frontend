import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizQuestion } from 'src/app/models/quiz-question';
import { QuizService } from 'src/app/services/quiz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.scss']
})
export class ManageQuestionComponent implements OnInit {
  constructor (private quizService: QuizService, private toastr: ToastrService) { }
  @Output() questionsSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() categorySelected: EventEmitter<any> = new EventEmitter<any>();
  @Input() quizSelectedId!: string;
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
  questionsToAdd: any[] = [];
  selectCategory: string = '';
  showUpdateForm = false;
  selected: any;
  isShow: boolean = false;

  ngOnInit() {
    this.loadCategories();
  }
  selectQuestions(selectedQuestionIds: string[]) {

    this.isSelectingQuestions = !this.isSelectingQuestions;
    if (this.isSelectingQuestions) {
      this.quizService.getAllQuestionByCategory(this.category).subscribe((questions: any) => {
        this.questions = selectedQuestionIds;
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
    this.selected = question;
    this.question_title = question.questionTitle;
    this.option_1 = question.option1;
    this.option_2 = question.option2;
    this.option_3 = question.option3;
    this.right_answer = question.rightAnswer;
    this.right_answer_2 = question.rightAnswer2;
    this.category = question.category;
    this.showUpdateForm = !this.showUpdateForm;

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
    if (!this.category) {
      this.toastr.error('La catégorie ne peut pas être vide.', 'Erreur');
    } else {
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

        this.createQuestion();
        this.toastr.success('Question ajoutée', 'Ajout');

      });
    }
  }
  getQuestionByCategory(category: string) {
    this.quizService.getAllQuestionByCategory(category).subscribe((questions: any) => {
      this.questions = questions;
    });
  }

  addQuestionToQuiz(quizSelectedId: string, category: string) {
    this.quizService.getAllQuestionByCategory(category).subscribe((questions: any) => {
      this.questionsToAdd = questions;
    });
  }
  selectQuestionsByCategory() {
    if (this.selectCategory) {
      this.quizService.getAllQuestionByCategory(this.selectCategory).subscribe((questions: any) => {
        this.questions = questions;
        this.selectCategoryEmit(this.selectCategory);
        this.selectQuestionsEmit(this.questions);
        this.isShow = !this.isShow;
      });
    }


    this.isShow = !this.isShow;
  }
  questionSelection(question: any) {
    question.selected = !question.selected;
  }
  loadCategories() {
    this.quizService.getCategories().subscribe(
      (categories: string[] | null) => {
        if (categories) {
          this.categoriesOptions = categories;
        } else {
          console.error("Aucune catégorie n'a été renvoyée par le service.");
        }
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
        this.selectCategoryEmit(this.selectCategory);
        this.selectQuestionsEmit(this.questions);
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
  }

  deleteQuestion(questionId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) {

      this.quizService.deleteQuestion(questionId).subscribe(() => {
        this.selectQuestionsByCategory();
        this.toastr.success('Question supprimée', 'Suppression');
      });
    }
  }

  updateQuestion(questionId: string, existingQuestion: any) {

    if (existingQuestion && questionId) {
      existingQuestion.question_title = this.question_title;
      existingQuestion.option_1 = this.option_1;
      existingQuestion.option_2 = this.option_2;
      existingQuestion.option_3 = this.option_3;
      existingQuestion.right_answer = this.right_answer;
      existingQuestion.right_answer_2 = this.right_answer_2;
    }

    this.quizService.updateQuestion(questionId, existingQuestion).subscribe(
      () => {
        this.toastr.success('Question modifiée', 'Modification');
        this.showUpdateForm = false;
        this.getQuestionByCategory(this.category);
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
  }

  selectQuestionToUpdate(existingQuestion: any) {
    this.question_title = existingQuestion.question_title;
    this.option_1 = existingQuestion.option_1;
    this.option_2 = existingQuestion.option_2;
    this.option_3 = existingQuestion.option_3;
    this.right_answer = existingQuestion.right_answer;
    this.right_answer_2 = existingQuestion.right_answer_2;
    this.showUpdateForm = true;
  }


}

