import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.scss']
})
export class ManageQuizComponent {
  isSelectedBadge: any;
  constructor (
    private quizService: QuizService) { }
  ngOnInit() {
    this.loadCategories();
  }
  quizzes: any[] = [];
  showQuizForm = false;
  // questions: Question[] = [];
  // question: any;
  newTitle: string = '';
  newContent: string = '';
  newDifficulty: string = '';
  isArchived: boolean = false;
  questions: any = {};
  question_title: string = '';
  option_1: string = '';
  option_2: string = '';
  option_3: string = '';
  right_answer: string = '';
  right_answer_2: string = '';
  category: string = '';
  showQuestionForm: boolean = false;
  // categories!: string; // Pour stocker les catégories récupérées depuis le serveur
  isSelectingQuestions: boolean = false;
  categoriesOptions: string[] = [];
  selectedCategory: string = '';
  isSelectedQuiz: boolean = false;
  quiz: any;
  questionsToAdd: any[] = [];
  quizzesOpen = false;
  badgesArray: any[] = [];
  badges: any[] = [];
  badgesOpen = false;
  name: string = '';
  description: string = '';
  image: string = '';
  showBadgeForm: boolean = false;
  selectedBadge: any;
  badgeId: string = '';


  getQuiz(): void {
    this.quizzesOpen = !this.quizzesOpen;
    if (this.quizzesOpen) {
      this.quizService.getQuizzes().subscribe((quizzes: any) => {
        this.quizzes = quizzes;
        console.log(quizzes);


      });
    }
  }
  selectQuiz(quizId: string) {
    this.isSelectedQuiz = !this.isSelectedQuiz;
    if (this.isSelectedQuiz) {

      this.quizService.getQuizById(quizId).subscribe((quiz: any) => {
        this.quiz = quiz;
        console.log("id", quizId);
      });
    }
  }

  deleteQuiz(id: string) {
    this.quizService.deleteQuiz(id).subscribe(() => {
      this.getQuiz();
      alert('Quiz supprimé');
    });
  }
  updateQuiz(id: string) {
    this.quizService.updateQuiz(id).subscribe(() => {
      this.getQuiz();
      alert('Quiz modifié');
    });
  }
  selectQuestions(selectedQuestionIds: string[]) {

    this.isSelectingQuestions = !this.isSelectingQuestions;
    if (this.isSelectingQuestions) {
      this.quizService.getAllQuestionByCategory(this.category).subscribe((questions: any) => {
        this.questions = selectedQuestionIds;
        console.log(selectedQuestionIds);
      });
    }
  }


  getQuestionContentForQuiz(questionId: string): void {
    this.quizService.getQuestionContent(questionId).subscribe(
      (question: any) => {
        if (question) {
          this.questions[questionId] = question; // Stockez les données dans l'objet "questions" avec l'ID de la question comme clé
          console.log("Données de la question récupérées depuis le serveur :", this.questions[questionId]);
        } else {
          console.error("La réponse du serveur est vide ou indéfinie.");
        }
      },
      (error: any) => {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    );
  }
  onCreateQuiz() {
    const newQuiz = {
      title: this.newTitle,
      difficulty: this.newDifficulty,
      content: this.newContent,
      archive: this.isArchived,
    };

    this.quizService.createQuiz(newQuiz).subscribe((response: any) => {
      console.log("Nouveau quiz créé :", response);
      this.getQuiz();
      this.createQuizForm();
    });
  }
  createQuiz() {
    this.showQuizForm = !this.showQuizForm;
  }
  createQuizForm() {
    this.newTitle = '';
    this.newDifficulty = "";
    this.newContent = '';
    this.isArchived = false;
  }
  createQuestion() {
    // Réinitialisez le formulaire
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
    if (this.selectedCategory) {
      this.quizService.getAllQuestionByCategory(this.selectedCategory).subscribe((questions: any) => {
        this.questions = questions;
        console.log("Les questions", questions);
        console.log("categorie", this.selectedCategory);
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
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
  }

  addSelectedQuestionsToQuiz(quizId: string) {
    console.log(this.questions);
    this.quizService.addQuestionByCategoryToQuiz(quizId, this.selectedCategory).subscribe((response: any) => {
      console.log("Questions ajoutées au quiz avec succès", response);
    })
  }
  deleteQuestion(id: string) {
    this.quizService.deleteQuestion(id).subscribe(() => {
      this.getQuestionByCategory(this.category);
      alert('Question supprimée');
    });
  }
  updateQuestion(id: string) {
    this.quizService.updateQuestion(id).subscribe(() => {
      this.getQuestionByCategory(this.category);
      alert('Question modifiée');
    });
  }
  createBadgeForm() {

    this.name = '';
    this.description = '';
    this.image = '';
    // this.badgesOpen = !this.badgesOpen;
  }
  createBadge() {
    this.showBadgeForm = !this.showBadgeForm;
  }

  onCreateBadge() {
    const newBadge = {
      name: this.name,
      description: this.description,
      image: this.image,
    };

    this.quizService.createBadge(newBadge).subscribe((response: any) => {
      console.log("Nouveau badge créé :", response);

    });
  }
  getBadge(): void {
    this.badgesOpen = !this.badgesOpen;
    if (this.badgesOpen) {
      this.quizService.getBadges().subscribe((badges: any) => {
        this.badges = badges;
        console.log(badges);
      });
    }
  }
  selectBadge(badgeId: string) {
    this.isSelectedBadge = !this.isSelectedBadge;
    if (this.isSelectedBadge) {

      this.quizService.getBadgeById(badgeId).subscribe((badge: any) => {
        this.badgesArray = badge;
        console.log("id", badgeId);
      });
    }
  }
  addBadgeToQuiz(quizId: string, badgeId: string) {
    console.log("quizId", quizId);
    console.log("badgeId", badgeId); // Vérifiez que badgeId est correct ici

    this.quizService.addBadgeToQuiz(quizId, badgeId).subscribe((response: any) => {
      console.log("Badge ajouté au quiz avec succès", response);
    });
  }
}
