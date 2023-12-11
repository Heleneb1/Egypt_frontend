
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { SendEmailService } from 'src/app/services/send-email.service';
import { UserService } from 'src/app/services/user.service';
import { loginUser } from '../login/login.component';


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
    this.commentsService.getComments().subscribe(


      (data: any) => {
        this.commentList = data;

        this.commentList.sort((a, b) => {
          return b.archive - a.archive;
        });

      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  archiveCommentByArticle(comment: Comment) {
    if (comment && confirm('Voulez-vous vraiment changer l\'état de ce commentaire ?')) {
      this.commentsService.updateCommentByArticleId(comment.id, comment).subscribe(
        (updatedComment: any) => {
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

    const commentToDelete = this.commentList.find(comment => comment.id === id);

    if (commentToDelete && confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
      this.commentsService.deleteComment(id, commentToDelete.content).subscribe(() => {
        this.toastr.info('Commentaire supprimé');

        // Envoi du message à l'auteur
        this.userService.getUserById(commentToDelete.author).subscribe((user: User) => {
          const author = user;
          this.userService.getUserEmail(author.id).subscribe((userEmail: string) => {
            author.email = userEmail;

            // Utilisez un service ou une méthode pour envoyer le message à l'auteur
            this.sendEmail.SendMessage(author);

            // Retirer le commentaire supprimé de la liste locale de commentaires
            this.commentList = this.commentList.filter(comment => comment.id !== id);
          });
        });
      });
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
