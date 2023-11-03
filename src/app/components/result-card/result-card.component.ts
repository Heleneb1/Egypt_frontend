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
  @Input() ratings: any;
  selectedArticle: Article | null = null;
  defaultImage: string = 'assets/images/Gizeh.jpg';
  isOpen = false;
  article: any = [];
  articleId: any;
  currentRating!: number;


  constructor (private router: Router, private articlesService: ArticlesService) { }

  ngOnInit() {

  }

  toggleDetails(selectedArticle: Article) {

    if (this.selectedArticle === selectedArticle) {
      this.selectedArticle = null;
    } else {
      this.selectedArticle = selectedArticle;
    }
    return this.selectedArticle;
  }

  goToArticleDetails() {
    if (this.selectedArticle) {
      console.log(this.selectedArticle.id);

      this.router.navigate(['/article', this.selectedArticle.id]);
    }
  }

}
