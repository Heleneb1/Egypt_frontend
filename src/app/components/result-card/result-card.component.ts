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
  @Input() filteredArticles: Article[] = [];
  selectedArticle: Article | null = null;
  defaultImage: string = 'assets/images/Gizeh.jpg';

  constructor(private router: Router, private articlesService: ArticlesService) { }

  ngOnInit() {
  }


  toggleDetails(selectedArticle: Article) {
    console.log('Article sélectionné:', selectedArticle);
    this.selectedArticle = (this.selectedArticle === selectedArticle) ? null : selectedArticle;
  }

  goToArticleDetails() {
    if (this.selectedArticle?.slug) {
      console.info('Navigation vers :', this.selectedArticle.id, this.selectedArticle.slug);
      this.router.navigate(['/article-details', this.selectedArticle.slug]);
    } else {
      console.error("Impossible d'afficher l'article : slug non défini !");
    }
  }
}
