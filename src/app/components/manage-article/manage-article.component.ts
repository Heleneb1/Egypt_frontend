import { Component } from '@angular/core';
import { Article } from 'src/app/models/article';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services/quiz.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss'],
})
export class ManageArticleComponent {
  articles: Article[] = [];
  newTitle: string = '';
  newContent: string = '';
  newImage: string = '';
  isArchived: boolean = false;
  existingArticle!: Article;
  showArticleForm = false;
  showUpdateForm = false;
  articlesOpen = false;
  newAuthor: string = '';
  newTag: string = '';
  newRating: number = 3.5;
  average!: number
  newQuizzes: any[] = [];
  allQuizzes: any;
  selectedQuizId: string = '';

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    this.loadAllQuizzes();
  }

  loadAllQuizzes() {
    this.quizService.getQuizzes().subscribe((quizzes: any) => {
      this.allQuizzes = quizzes;
    });
  }
  getArticles() {
    this.adminService.getArticles().subscribe((articles: any[]) => {
      this.articles = articles;

      // Pour chaque article, charger ses quiz associés
      this.articles.forEach(article => {
        if (article.quizzesIds && article.quizzesIds.length > 0) {
          const quizRequests = article.quizzesIds.map(id =>
            this.quizService.getQuizById(id)
          );

          forkJoin(quizRequests).subscribe(quizzes => {
            article.quizzes = quizzes;  // Stocker les quiz complets dans une nouvelle propriété
          });
        } else {
          article.quizzes = [];
        }
      });

      this.articlesOpen = true;
    });
  }
  selectedImage: File | null = null;

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  deleteArticle(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.adminService.deleteArticle(id).subscribe(() => {
        this.toastr.success('Article supprimé', 'Suppression');
        this.getArticles();
      });
    }
  }

  editArticle(article: Article) {
    this.existingArticle = article;
    if (article.quizzesIds && article.quizzesIds.length > 0) {
      const quizRequests = article.quizzesIds.map(id => this.quizService.getQuizById(id));

      forkJoin(quizRequests).subscribe((quizzes) => {
        console.log(quizzes);
        this.newQuizzes = quizzes;

      });
    } else {
      this.newQuizzes = [];
    }

    this.showUpdateForm = !this.showUpdateForm;
  }

  saveChanges() {
    if (this.existingArticle) {
      this.existingArticle.title = this.newTitle;
      this.existingArticle.image = this.newImage;
      this.existingArticle.content = this.newContent;
      this.existingArticle.archive = this.isArchived;
      this.existingArticle.author = this.newAuthor;
      this.existingArticle.tag = this.newTag;
      this.existingArticle.ratings = [this.newRating];
      if (this.existingArticle.id) {
        this.adminService
          .updateArticle$(this.existingArticle.id, this.existingArticle)
          .subscribe(() => {
            this.getArticles();

            this.toastr.success('Article modifié', 'Modification');
          });
      } else {
        this.toastr.error('ID de l\'article manquant', 'Erreur');
      }
    }
  }

  archivedArticle(article: Article) {
    this.existingArticle = article;
    this.existingArticle.archive = this.isArchived;
    if (this.existingArticle.id) {

      this.adminService
        .updateArticle$(this.existingArticle.id, this.existingArticle)
        .subscribe(() => {
          this.getArticles();
          this.showArticleForm = !this.showArticleForm;

          this.toastr.success('Article archivé', 'Archivage');
        });
    }
  }

  cancelChanges() {
    this.toastr.info('Annulation', 'Annulation');
    this.showArticleForm = !this.showArticleForm;
  }

  toggleArchiveState(article: Article) {
    this.isArchived = !article.archive;
  }
  createArticle() {
    this.showArticleForm = !this.showArticleForm;
  }
  addArticle() {
    const newArticle: Article = {
      title: this.newTitle,
      image: this.newImage,
      content: this.newContent,
      archive: this.isArchived,
      author: this.newAuthor,
      tag: this.newTag,
      ratings: [],
      averageRating: this.average,
      comments: [],
      creation_date: new Date(),
      edition_date: new Date(),
    };
    console.log(newArticle)
    // this.showArticleForm = !this.showArticleForm;

    this.adminService.addNewArticle$(newArticle).subscribe((response: any) => {
      const newArticleWithID: Article = response;

      this.getArticles();
      this.toastr.success(
        "Article ajouté avec succès. ID de l'article : " + newArticleWithID.id
      );

    });
  }
  addQuizToArticle(articleId: string, quizId: string) {
    if (!articleId || !quizId) {
      this.toastr.error('ID manquant', 'Erreur');
      return;
    }
    this.adminService.addQuizToArticle$(articleId, quizId).subscribe(() => {
      this.toastr.success('Quiz ajouté à l\'article', 'Ajout de Quiz');
      this.getArticles();
    });
  }

  removeQuizFromArticle(articleId: string | undefined, quizId: string) {

    if (!articleId) {
      this.toastr.error('ID de l\'article manquant', 'Erreur');
      return;
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce quiz de l\'article ?')) {
      return;
    }


    console.log(articleId, quizId);
    this.adminService.removeQuizFromArticle$(articleId, quizId).subscribe(() => {
      this.toastr.success('Quiz supprimé de l\'article', 'Suppression de Quiz');
      this.getArticles();
    });
  }

}
