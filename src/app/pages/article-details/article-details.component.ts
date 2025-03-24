import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { Article } from 'src/app/models/article';
import { SlugService } from 'src/app/services/slug.service';
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
  articleSlug!: string;

  constructor(
    private articlesService: ArticlesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    // private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    // private slugService: SlugService,
    // private router: Router,

  ) { }
  formatDate(creationDate: number[] | undefined) {
    if (!creationDate || creationDate.length < 3) {
      return "Date inconnue"; // Gérer le cas où les données sont absentes
    }

    const date = new Date(
      creationDate[0], // Année
      creationDate[1] - 1, // Mois (les mois commencent à 0 en JS)
      creationDate[2] // Jour
    );
    return date.toLocaleDateString('fr-FR'); // Format jj/mm/aaaa
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.articleId = params.get('id'); // UUID, donc pas de conversion en number

      this.articleSlug = params.get('slug') || '';
      console.info("Slug récupéré :", this.articleSlug);


      if (this.articleSlug) {
        this.articlesService.getArticleBySlug(this.articleSlug).subscribe((article) => {
          this.article = article;
          this.commentList = this.article.comments;
          this.rating = this.article.rating;
          this.articleId = this.article.id
        });
      }

    });

    this.authService.getUserConnected().subscribe((user) => {
      this.isConnected = !!user;
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

    }
  }
  onRatingChanged(rating: number) {
    if (!this.isConnected) {
      this.toastr.error('Vous devez être connecté pour évaluer cet article');
    }
    this.currentRating = rating;
    this.isVoteModified = true;
  }
}
