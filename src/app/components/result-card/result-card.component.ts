import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {
  @Input() filteredArticle: Article[] = [];
  selectedArticle: Article | null = null;
  defaultImage: string = 'assets/images/Gizeh.jpg';
  isOpen = false;
  constructor (private router: Router) { }

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
