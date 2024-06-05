import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/models/article';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articles-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent {
  articles: Article[] = [];
  article: any = [];
  articleId: any;
  // userId: any;
  isVoteModified: boolean = false;
  currentRating!: number;
  // authorName: any;
  defaultImage: string = 'assets/images/Gizeh.jpg';
  isConnected: boolean = false;
  showComment: boolean = false;
  commentList: any[] = [];
  // articleCommentId: any;
  rating: any;
  editionDate: any = new Date();

  constructor(
    private articlesService: ArticlesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {}
  formatDate(dateString: string | null): void {
    this.editionDate = new Date(this.article.editionDate);
    console.log('Date de création:', this.editionDate);
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.articleId = params.get('id');
      this.articlesService
        .getArticleById(this.articleId)
        .subscribe((article) => {
          this.article = article;
          this.commentList = this.article.comments;
          this.rating = this.article.rating;
        });
    });

    this.authService.getUserConnected().subscribe((user) => {
      if (user) {
        this.isConnected = true;
      } else {
        this.isConnected = false;
        this.toastr.error('Vous devez être connecté pour évaluer cet article');
      }
    });
  }

  onComment() {
    this.showComment = !this.showComment;
  }
  saveVote() {
    if (this.currentRating >= 0 && this.currentRating <= 5) {
      this.articlesService.addRating(this.articleId, this.currentRating);
      this.isVoteModified = false;
      this.article.rating = this.currentRating;
      this.toastr.success(
        `Vous avez évalué cet Article à ${this.currentRating} étoiles`
      );
    } else {
    }
  }
  onRatingChanged(rating: number) {
    this.currentRating = rating;
    this.isVoteModified = true;
  }
}
