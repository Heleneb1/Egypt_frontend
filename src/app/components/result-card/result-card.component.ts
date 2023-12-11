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
  selectedArticle: Article | null = null;
  defaultImage: string = 'assets/images/Gizeh.jpg';

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
      console.info(this.selectedArticle.id);

      this.router.navigate(['/article', this.selectedArticle.id]);
    }
  }

}
