
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { SendEmailService } from 'src/app/services/send-email.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.scss']
})
export class ManageCommentsComponent implements OnInit {
  commentList: any[] = [];
  showComments: boolean = false;
  // isArchived!: boolean;
  // authorId!: string;
  articleId!: string;
  // comment: any[] = []

  constructor (private commentsService: CommentsService, private toastr: ToastrService, private sendEmail: SendEmailService, private userService: UserService) { }

  ngOnInit() {
    this.fetchComments();
  }

  fetchComments() {
    console.log("fetch managecomments", this.articleId);
    this.commentsService.getComments().subscribe(


      (data: any) => {
        this.commentList = data;

        this.commentList.sort((a, b) => {
          return b.archive - a.archive;
        });

        console.log('Comments loaded successfully:', this.commentList);
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  archiveCommentByArticle(comment: Comment) {
    console.log('Comment to archive:', comment);
    if (comment && confirm('Voulez-vous vraiment changer l\'état de ce commentaire ?')) {
      this.commentsService.updateCommentByArticleId(comment.id, comment).subscribe(
        (updatedComment: any) => {
          console.log('Comment state changed successfully:', updatedComment);
          this.toastr.info(`Commentaire ${updatedComment.archive ? 'archivé' : 'restauré'}`);
          this.fetchComments();
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du commentaire:', error);
        }
      );
    }
  }

  deleteComment(id: string) {
    console.log('Comment to delete:', id);

    const commentToDelete = this.commentList.find(comment => comment.id === id);
    console.log('Comment author:', commentToDelete.author); // Contains the author's id

    if (commentToDelete && confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
      this.userService.getUserById(commentToDelete.author).subscribe((user: User) => {
        const author = user;
        console.log('Comment author:', author);
        this.userService.getUserEmail(author.id).subscribe((userEmail: string) => {
          author.email = userEmail;
          console.log('Comment author email:', userEmail);

          this.commentsService.deleteComment(id, commentToDelete.content).subscribe(() => {
            console.log('Comment deleted successfully:', commentToDelete);
            this.toastr.info('Commentaire supprimé');

            // Send email when comment is deleted
            this.sendEmail.SendMessage(author);

            this.fetchComments(); // Refresh the comment list here
          });
        });
      });
    }
  }
  toggleComments() {
    this.showComments = !this.showComments;
  }
}
