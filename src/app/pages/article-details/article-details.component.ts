import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articles-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent {
  article: any = [];
  articleId: any;
  userId: any;
  isVoteModified: boolean = false;
  currentRating: number = 3.5;
  authorName: any;
  defaultImage: string = 'assets/images/Gizeh.jpg';


  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer
  ) { }
  formatDate(date: string | null): string {
    if (date === null) {
      return '';
    }
    return this.datePipe.transform(date, 'dd MMMM yyyy') || '';
  }
  ngOnInit() {

    this.route.paramMap.subscribe((params) => {
      this.articleId = params.get('id');
      this.articlesService.getArticleById(this.articleId).subscribe((article) => {
        this.article = article;
        console.log(this.article);


      });
    });
  }

  onRatingChanged(rating: number) {
    this.currentRating = rating;
    this.isVoteModified = true;

  }

  saveRating(rating: number) {
    this.articlesService.addRating(this.articleId, rating);
    this.isVoteModified = false;
  }
}
