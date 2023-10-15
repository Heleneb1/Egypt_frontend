import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() articleCommentId: any;
  @Input() authorName!: User;
  selectedFile: File | null = null;
  avatarFilename!: string;
  avatarUrl: SafeUrl | string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWje_gjVcmi-wks5nTRnW_xv5W2l3MVnk7W1QDcZuhNg&s';
  comment!: Comment;
  userConnected: any;
  articleId!: any;
  commentList: Comment[] = [];
  commentContent: string = '';
  showComment: boolean = false;
  editComment: boolean = false;
  authorId!: string;
  isEditingBiography = false;
  objectURL: any;
  user: any = [];

  constructor (
    private authService: AuthService,
    private httpClient: HttpClient,
    private datePipe: DatePipe,
    private commentsService: CommentsService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.userConnected = this.authService.getUserConnected();
  }

  formatDate(date: Date | null): string {
    if (date === null || date === undefined) {
      return '';
    }

    const formattedDate = this.datePipe.transform(date, 'dd MMMM yyyy') || '';

    return formattedDate;
  }

  ngOnInit() {
    this.commentList = [];
    this.commentsService.getCommentsByArticleId(this.articleCommentId).subscribe((comments: Comment[]) => {
      this.commentList = comments;
      console.log('Comment List:', this.commentList);

      this.commentList.forEach((comment: Comment) => {
        this.userService.getUserById(comment.author).subscribe((author: User) => {
          const editId = comment.author = author.id;
          this.userService.getUserAvatarForComment(editId).subscribe((avatarUrl: string) => {
            comment.authorAvatar = avatarUrl;
            this.userService.getUserName(editId).subscribe((authorName: string) => {
              comment.authorName = authorName;

            })
          })
        });
      });
    });

    // this.userConnected.subscribe((user: { id: any; }) => {
    //   this.authorId = user.id;
    //   this.userService.getUserById(this.authorId).subscribe((user: User) => {
    //     this.user = user;
    //     this.userService.getUserAvatarForComment(this.authorId).subscribe((avatarUrl: string) => {
    //       this.avatarUrl = avatarUrl;
    //     });
    //   });
    // });
  }

  // loadAvatar(avatarUrl: SafeUrl | string) {
  //   console.log(avatarUrl);

  //   return this.httpClient.get(environment.apiUrl + `/users/avatar/${this.avatarUrl}`);
  // }

  onEditComment() {
    this.editComment = !this.editComment;
  }

  addComment(): void {
    this.userConnected.subscribe((user: { id: any; }) => {
      const authorId = user.id;

      if (!this.commentContent) {
        alert('Le commentaire ne peut pas être vide.');
        return;
      }
      // /{articleId}/{authorId}/add-comment
      // articles/${this.articleCommentId}/${authorId}/add-comment
      const url = environment.apiUrl + `/comments/${authorId}/articles/${this.articleCommentId}/add-comment`;
      // const url = environment.apiUrl + `/articles/${this.articleCommentId}/${authorId}/add-comment`;
      this.httpClient.put(url, {
        content: this.commentContent,
        user: authorId,
        article: this.articleCommentId
      }).subscribe(
        (response) => {
          this.ngOnInit();
          this.commentContent = '';
          alert('Commentaire ajouté avec succès.');
          this.editComment = false;
        },
        (error) => {
          console.error('Failed to add comment to article:', error);
        }
      );
    });
  }

  onComment() {
    this.commentList
    console.log(this.commentList);

    this.showComment = !this.showComment;
  }
}
