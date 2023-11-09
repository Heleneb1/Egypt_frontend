// Import necessary modules and components
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-manage-comments',
  templateUrl: './manage-comments.component.html',
  styleUrls: ['./manage-comments.component.scss']
})
export class ManageCommentsComponent implements OnInit {
  commentList: any[] = [];
  showComments: boolean = false;
  isArchived!: boolean;
  authorId!: string;

  constructor (private commentsService: CommentsService, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchComments();
  }

  fetchComments() {
    this.commentsService.getComments().subscribe(
      (data: any) => {
        this.commentList = data;

        // Sort the commentList by the 'archive' property in descending order
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

  archiveComment(id: string) {
    console.log('Comment to archive:', id);

    const commentToArchive = this.commentList.find(comment => comment.id === id);

    if (commentToArchive) {
      commentToArchive.archive = true;
      this.commentsService.updateComment(id, commentToArchive).subscribe(() => {
        console.log('Comment archived successfully:', commentToArchive);
        this.toastr.info('Commentaire archivé');
        this.fetchComments(); // Actualisez la liste ici
      });
    }
  }

  deleteComment(id: string) {
    console.log('Comment to delete:', id);
    const commentToDelete = this.commentList.find(comment => comment.id === id);

    if (commentToDelete && confirm('Voulez-vous vraiment supprimer ce commentaire ?')) {
      this.commentsService.deleteComment(id).subscribe(() => {
        console.log('Comment deleted successfully:', commentToDelete);
        this.toastr.info('Commentaire supprimé');
        this.fetchComments(); // Actualisez la liste ici

      });
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }
}
