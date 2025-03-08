import { Component } from '@angular/core';
import { Article } from 'src/app/models/article';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}
  getArticles() {
    this.articlesOpen = !this.articlesOpen;
    if (this.articlesOpen) {
      this.adminService.getArticles().subscribe((articles) => {
        this.articles = articles;
      });
    }
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
    this.newTitle = article.title;
    this.newImage = article.image;
    this.newAuthor = article.author;
    this.newTag = article.tag;
    this.newRating = article.ratings;
    this.newContent = article.content;
    this.isArchived = article.archive;
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
      this.existingArticle.ratings = this.newRating;
      this.adminService
        .updateArticle$(this.existingArticle.id, this.existingArticle)
        .subscribe(() => {
          this.getArticles();

          this.toastr.success('Article modifié', 'Modification');
        });
    }
  }

  archivedArticle(article: Article) {
    this.existingArticle = article;
    this.existingArticle.archive = this.isArchived;
    this.adminService
      .updateArticle$(this.existingArticle.id, this.existingArticle)
      .subscribe(() => {
        this.getArticles();
        this.showArticleForm = !this.showArticleForm;

        this.toastr.success('Article archivé', 'Archivage');
      });
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
      id: '',
      title: this.newTitle,
      image: this.newImage,
      content: this.newContent,
      archive: this.isArchived,
      author: this.newAuthor,
      tag: this.newTag,
      ratings: this.newRating,
      comments: [],
      creation_date: new Date(),
      edition_date: new Date(),
    };

    this.showArticleForm = !this.showArticleForm;

    this.adminService.addNewArticle$(newArticle).subscribe((response: any) => {
      const newArticleWithID: Article = response;

      this.getArticles();
      this.toastr.success(
        "Article ajouté avec succès. ID de l'article : " + newArticleWithID.id
      );
    });

    this.newTitle = '';
    this.newImage = '';
    this.newContent = '';
    this.isArchived = false;
  }
}
