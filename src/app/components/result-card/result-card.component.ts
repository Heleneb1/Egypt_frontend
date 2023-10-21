import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {
  @Input() filteredArticle: Article[] = [];
  @Input() tag: string = '';
  selectedArticle: Article | null = null;
  defaultImage: string = 'assets/images/Gizeh.jpg';
  isOpen = false;
  article: any = [];
  articleId: any;
  rating: any;
  currentRating!: number;

  constructor (private router: Router, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.tag = this.tag;
    console.log(this.tag);



    this.articlesService.getArticles().subscribe((article) => {
      this.article = article;
      console.log(this.article);

      this.rating = this.article.rating;
      console.log(this.rating);
    });
  }

  toggleDetails(selectedArticle: Article) {
    if (this.selectedArticle === selectedArticle) {
      this.selectedArticle = null;
    } else {
      this.selectedArticle = selectedArticle;
    }
    // this.showDetails = !this.selectedArticle;
    return this.selectedArticle;
  }

  goToArticleDetails() {
    if (this.selectedArticle) {
      console.log(this.selectedArticle.id);

      this.router.navigate(['/article', this.selectedArticle.id]);
    }
  }

}
