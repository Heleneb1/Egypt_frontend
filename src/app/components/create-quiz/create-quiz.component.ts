import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {

  showModal = false;
  textValue: string = '';
  picture: string = '';
  tag: string = '';
  difficulty: string = '';
  userConnected: any;
  userId: string = '';
  isArchived: boolean = true;
  descriptionText: string = '';
  question_title: string = '';
  option_1: string = '';
  option_2: string = '';
  option_3: string = '';
  right_answer: string = '';
  right_answer_2: string = '';
  category: string = '';
  createdQuestions: any[] = [];
  createdQuiz: any;
  formValid: boolean = false;

  constructor (
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private quizService: QuizService,
  ) {
    this.userConnected = this.authService.getUserConnected();
    this.authService.getUserConnected().subscribe((user: any) => {
      this.userConnected = user;
      this.userId = user?.userId;
    });
  }

  ngOnInit(): void { }
  checkFormValidity(): boolean {
    // Vérifiez ici si tous les champs nécessaires sont remplis
    return !!this.textValue && !!this.tag && !!this.difficulty && !!this.picture && this.createdQuestions.length > 4;
  }
  createQuiz(): void {
    if (this.checkFormValidity()) {
      const userId = this.userConnected.id;
      const url = environment.apiUrl + `/quizzes/create/${userId}`;

      const data = {
        content: this.descriptionText,
        title: this.textValue,
        picture: this.picture,
        tag: this.tag,
        difficulty: this.difficulty,
        archive: this.isArchived,
      };

      this.http.post(url, data).subscribe(
        (response: any) => {
          console.log('Quiz created', response);
          this.createdQuiz = response;  // Sauvegardez le quiz créé
          this.addQuestionsToQuiz(this.category);  // Ajoutez les questions au quiz
        },
        (error) => {
          console.error('Failed to create quiz', error);
        }
      );


      this.resetForm();
      this.toastr.success('Le quiz est créé avec succès !');
    } else {
      // Affichez un message d'erreur ou prenez toute autre action nécessaire
      this.toastr.error('Veuillez remplir tous les champs obligatoires.');
    }
  }
  createQuestion() {
    this.question_title = '';
    this.option_1 = '';
    this.option_2 = '';
    this.option_3 = '';
    this.right_answer = '';
    this.right_answer_2 = '';
    // this.category = '';
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
      });
      this.createdQuestions.push(newQuestion);
    }
  }

  resetForm(): void {
    this.textValue = '';
    this.picture = '';
    this.tag = '';
    this.difficulty = '';
    this.isArchived = true;
    this.descriptionText = '';
  }
  addQuestionsToQuiz(category: string) {
    if (this.createdQuiz && this.createdQuestions.length > 0) {
      console.log("quizId", this.createdQuiz.id);
      console.log("questions", this.createdQuestions);
      console.log("category", category);

      this.quizService.addQuestionByCategoryToQuiz(this.createdQuiz.id, category).subscribe((response: any) => {
        this.toastr.success('Questions ajoutées au quiz', 'Ajout');
      });
    }
  }

}

