import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() articleCommentId: any;
  comment!: Comment;
  userConnected!: any;
  articleId!: any;
  commentList: Comment[] = [];
  commentContent: string = '';
  showComment: boolean = false;
  editComment: boolean = false;
  authorId!: string;



  //add comment to article
  //TODO : add comment to article with articlecontroller
  constructor (private router: Router,
    private authService: AuthService,
    private articlesService: ArticlesService,
    private httpClient: HttpClient,
    private datePipe: DatePipe,
    private commentsService: CommentsService,
    private userService: UserService) {

    this.userConnected = this.authService.getUserConnected();


  }
  formatDate(date: string | null): string {
    if (date === null) {
      return '';
    }
    return this.datePipe.transform(date, 'dd MMMM yyyy') || '';
  }
  ngOnInit() {
    this.articleCommentId;
    // Utilisez this.articleCommentId pour récupérer les commentaires spécifiques à cet article
    this.commentsService.getCommentsByArticleId(this.articleCommentId).subscribe((comments: Comment[]) => {
      // Assigner les commentaires à la liste des commentaires
      console.log("id ", this.articleCommentId);

      this.commentList = comments;
      console.log("liste", this.commentList);
      // Récupérez le nom de l'auteur pour chaque commentaire
      this.commentList.forEach((comment: Comment) => {
        this.userService.getUserName(comment.author).subscribe((authorName: string) => {
          comment.author = authorName;
        });
      });
    });
  }

  onEditComment() {
    this.editComment = !this.editComment;
  }


  addComment(): void {
    this.userConnected.subscribe((user: { id: any; }) => {
      const authorId = user.id;
      console.log(authorId);
      console.log("CommentContent", this.commentContent);
      console.log(this.articleCommentId);

      // Vérifiez si le contenu du commentaire est vide ou null
      if (!this.commentContent) {
        alert('Le commentaire ne peut pas être vide.');
        return;
      }

      const url = environment.apiUrl + `/comments/${authorId}/articles/${this.articleCommentId}/add-comment`;

      console.log(url);

      // Utilisez this.commentContent pour envoyer le contenu du commentaire
      this.httpClient.put(url, {
        content: this.commentContent,
        user: authorId,
        article: this.articleCommentId
      })
        .subscribe((response) => {
          this.ngOnInit();
          this.commentContent = '';
          console.log(response);
          // Après avoir ajouté un commentaire, rafraîchir la liste des commentaires
          alert('Commentaire ajouté avec succès.');

        },
          (error) => {
            console.error('Failed to add comment to article:', error);
          });
    });
  }
  // commentView() {
  //   this.commentsService.getCommentsByArticle(this.articleCommentId);
  //   // this.commentList;


  //   // return this.commentList;
  // }
  onComment() {
    this.showComment = !this.showComment;
  }
}



