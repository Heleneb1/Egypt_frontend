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
  // ratings: any;
  currentRating!: number;

  constructor (private router: Router, private articlesService: ArticlesService) { }

  ngOnInit() {
    // this.tag = this.tag;
    // console.log("TAG", this.tag);

    // this.articlesService.getArticles().subscribe((article) => {
    //   this.article = article;
    //   console.log("Article", this.article);


    // });
  }

  toggleDetails(selectedArticle: Article) {
    // console.log("this is the selected article", this.selectedArticle);
    // this.articleId = this.selectedArticle?.id;

    // this.ratings = this.articleId.ratings;
    // console.log("Ratings", this.ratings);


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
