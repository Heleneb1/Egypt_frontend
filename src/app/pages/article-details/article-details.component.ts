import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
// import { UserService } from 'src/app/services/user.service';

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
  // authorName: any;
  defaultImage: string = 'assets/images/Gizeh.jpg';
  isConnected: boolean = false;
  showComment: boolean = false;
  commentList: any[] = [];
  articleCommentId: any;
  rating: any;

  constructor (
    private articlesService: ArticlesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    // private router: Router,
    // private http: HttpClient,
    private datePipe: DatePipe,
    // private sanitizer: DomSanitizer,
    private authService: AuthService,

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

  // onRatingChanged(rating: number) {
  //   this.currentRating = rating;
  //   this.isVoteModified = true;

  // }

  // saveRating(rating: number) {
  //   this.articlesService.addRating(this.articleId, rating);
  //   this.isVoteModified = false;
  // }
  onComment() {
    this.showComment = !this.showComment;
  }
  saveVote() {

    console.log(this.currentRating);
    console.log(this.articleId);


    if (this.currentRating >= 0 && this.currentRating <= 5) {
      this.articlesService.addRating(this.articleId, this.currentRating);
      this.isVoteModified = false;
      this.article.rating = this.currentRating;
      // this.showSuccess();
      // alert(`Vous avez évalué cet Article à ${this.currentRating} étoiles`);
      this.toastr.success(`Vous avez évalué cet Article à ${this.currentRating} étoiles`);
    } else {

    }
  }
  onRatingChanged(rating: number) {
    this.currentRating = rating;
    this.isVoteModified = true;

  }


  // showSuccess() {
  //   this.toastr.success(`Vous avez évalué cet Article à ${this.currentRating} étoiles`);
  // }

}
