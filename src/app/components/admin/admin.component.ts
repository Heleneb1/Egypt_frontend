import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  articles: Article[] = [];
  newTitle: string = '';
  newContent: string = '';
  newImage: string = '';
  isArchived: boolean = false;
  existingArticle!: Article;
  showArticleForm = false;
  isOpenned = false;
  newAuthor: string = '';
  newTag: string = '';
  newRating: number = 3.5;

  constructor (private adminService: AdminService) { }

  ngOnInit() {
    // this.getArticles();
  }

  getArticles() {
    this.isOpenned = !this.isOpenned; // Inversez la valeur de isOpenned à chaque clic

    if (this.isOpenned) {
      // Seulement si isOpenned est true, obtenez les articles
      this.adminService.getArticles().subscribe(articles => {
        this.articles = articles;
      });
    }
  }

  selectedImage: File | null = null; // Propriété pour stocker le fichier sélectionné

  onImageSelected(event: any) {
    const selectedFile = event.target.files[0]; // Récupérer le premier fichier sélectionné
    this.selectedImage = selectedFile;
  }


  deleteArticle(id: string) {
    this.adminService.deleteArticle(id).subscribe(() => {
      this.getArticles();
      alert('Article supprimé');
    });
  }

  editArticle(article: Article) {
    this.existingArticle = article;
    this.newTitle = article.title;
    this.newImage = article.image;
    this.newContent = article.content;
    this.isArchived = article.archive;
    this.showArticleForm = true;
  }

  saveChanges() {
    if (this.existingArticle) {
      this.existingArticle.title = this.newTitle;
      this.existingArticle.image = this.newImage;
      this.existingArticle.content = this.newContent;
      this.existingArticle.archive = this.isArchived;
      this.adminService.updateArticle(this.existingArticle.id, this.existingArticle).subscribe(() => {
        this.getArticles();

        this.showArticleForm = !this.showArticleForm;
        alert('Article modifié');
      });
    }
  }

  archivedArticle(article: Article) {
    this.existingArticle = article;
    this.existingArticle.archive = this.isArchived;
    this.adminService.updateArticle(this.existingArticle.id, this.existingArticle).subscribe(() => {
      this.getArticles();
      this.showArticleForm = !this.showArticleForm;
      alert('Article archivé');

    });
  }

  cancelChanges() {

    alert('Annulation');
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
      rating: this.newRating,
      comments: [],
      creation_date: new Date(),
      edition_date: new Date()
    };


    this.showArticleForm = !this.showArticleForm;
    console.log(newArticle);

    this.adminService.addNewArticle(newArticle).subscribe((response: any) => {
      const newArticleWithID: Article = response;
      console.log("createId", newArticleWithID);

      this.getArticles();
      alert('Article ajouté avec succès. ID de l\'article : ' + newArticleWithID.id);
    });

    this.newTitle = '';
    this.newImage = '';
    this.newContent = '';
    this.isArchived = false;
  }
}
