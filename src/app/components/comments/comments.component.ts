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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() articleCommentId: any;
  @Input() authorName!: User;
  selectedFile: File | null = null;
  avatarFilename!: string;
  avatarUrl!: string;
  defaultAvatarUrl: SafeUrl | string =
    'https://cdn.pixabay.com/photo/2018/04/14/08/45/egypt-3318550_1280.jpg';
  commentId!: string;
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
  isArchived: boolean = true;
  showCodeOfConduct: boolean = false;
  creationDate: any = new Date();

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private datePipe: DatePipe,
    private commentsService: CommentsService,
    private userService: UserService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.userConnected = this.authService.getUserConnected();
  }
  formatDate(dateString: string | null): void {
    this.creationDate = new Date(this.comment.creationDate);
    console.info('Date de création:', this.creationDate);
  }

  ngOnInit() {
    this.commentList = [];
    this.commentId = '';
    this.userConnected = this.authService.getUserConnected();
    this.userConnected.subscribe((user: any) => {
      this.userConnected = user;

      this.commentsService
        .getCommentsByArticleId(this.articleCommentId)
        .subscribe((comments: Comment[]) => {
          this.commentList = comments.filter(
            (comment: Comment) => !comment.archive
          );

          this.commentList.forEach((comment: Comment) => {
            this.userService
              .getUserById(comment.author)
              .subscribe((author: User) => {
                const editId = (comment.author = author.id);
                this.userService
                  .getUserName(editId)
                  .subscribe((authorName: string) => {
                    comment.authorName = authorName;
                  });
              });
          });
          this.commentList.forEach((comment: Comment) => {
            this.userService
              .getUserAvatarForComment(comment.author)
              .subscribe((avatarBlob: Blob) => {
                const avatarUrl = URL.createObjectURL(avatarBlob);
                comment.authorAvatar = avatarUrl;
              });
          });
        });
    });
  }

  showCodeOfConductModal() {
    this.showCodeOfConduct = !this.showCodeOfConduct;
  }
  closeCodeOfConductModal() {
    this.showCodeOfConduct = false;
  }

  onEditComment() {
    this.editComment = !this.editComment;
  }

  addComment(): void {
    if (this.userConnected) {
      const authorCommentId = this.userConnected.id;
      if (!this.commentContent) {
        this.toastr.warning('Le commentaire ne peut pas être vide.');
        return;
      }

      const url =
        environment.apiUrl +
        `/comments/${authorCommentId}/articles/${this.articleCommentId}/add-comment`;
      const data = {
        content: this.commentContent,
        user: authorCommentId,
        article: this.articleCommentId,

        archive: this.isArchived,
      };

      this.httpClient.put(url, data).subscribe(
        (response: any) => {
          this.ngOnInit();
          this.commentContent = '';
          this.toastr.success(
            'Commentaire ajouté avec succès, il sera visible après validation de notre Scribe.'
          );
          this.editComment = false;
        },
        (error: any) => {
          console.error('Failed to add comment to article:', error);
        }
      );
    }
  }
  deleteMyComment(commentId: string, authorId: string) {
    if (this.userConnected.id === authorId) {
      if (confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
        this.commentsService
          .deleteCommentByAuthor(commentId, authorId)
          .subscribe((response) => {
            this.toastr.success('Commentaire supprimé avec succès.');
            this.ngOnInit();
          });
      }
    }
  }
  onComment() {
    if (this.commentList.length > 0) {
      this.showComment = !this.showComment;
    } else {
      const message = "Il n'y a pas encore de commentaire pour cet article.";
      this.toastr.info(message);
    }
  }
}
