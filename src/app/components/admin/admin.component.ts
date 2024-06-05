import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommentsService } from 'src/app/services/comments.service';
import { QuizService } from 'src/app/services/quiz.service';
import { SendEmailService } from 'src/app/services/send-email.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  quiz: any = {};
  selectedBadge: any;
  selectedQuiz: any;
  selectedQuestions: string[] = [];
  selectedCategory: string = '';
  contact: any = {};
  contactCount: number = 0;
  showMsg: boolean = false;
  showArchivedComments: boolean = false;
  animate: boolean = false;
  isShaking: boolean = false;
  commentList: any[] = [];
  archivedCommentCount: number = 0;
  archivedComments: any[] = [];
  showCmt: boolean = false;

  constructor(
    private quizService: QuizService,
    private toastr: ToastrService,
    private sendEmailService: SendEmailService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.sendEmailService.getContact().subscribe((contact: any) => {
      this.contact = contact;
      this.contactCount = contact.length;
    });

    this.commentsService.getComments().subscribe((data: any) => {
      this.commentList = data;
      const archivedComments = this.commentList.filter(
        (comment) => comment.archive
      );
      this.archivedCommentCount = archivedComments.length;
      this.commentList.sort((a, b) => {
        return b.archive - a.archive;
      });
    });
  }

  onClickShowCommentsArchived() {
    if (this.showArchivedComments) {
      this.commentsService.getComments().subscribe((data: any) => {
        this.commentList = data;
        this.archivedComments = this.commentList.filter(
          (comment) => comment.archive
        );
      });
    }

    this.showArchivedComments = !this.showArchivedComments;
    this.showCmt = this.showArchivedComments;
  }

  showComment() {
    this.showCmt = this.showArchivedComments;
  }
  toggleShake() {
    this.isShaking = !this.isShaking;
  }

  onQuizSelected(selectedQuiz: any) {
    this.selectedQuiz = selectedQuiz;
  }
  onBadgeSelected(selectedBadge: any) {
    this.selectedBadge = selectedBadge;
  }
  showMessage() {
    this.showMsg = !this.showMsg;
  }
  getContact() {
    this.sendEmailService.getContact().subscribe((contact: any) => {
      this.contact = contact;
      this.showMsg = true;
      this.isShaking = true;
    });
  }
  openComment() {
    this.showCmt = true;
  }

  deleteMessage(id: number) {
    if (confirm('Voulez-vous supprimer ce message ?')) {
      this.sendEmailService.deleteContact(id).subscribe((response: any) => {
        this.toastr.success('Message supprimé', 'Suppression');
        this.getContact();
        this.contactCount--;
      });
    }
  }

  addBadgeToQuiz(selectedQuiz: any, selectedBadge: any) {
    if (this.selectedQuiz && this.selectedBadge) {
      this.quizService
        .addBadgeToQuiz(this.selectedQuiz.id, this.selectedBadge.id)
        .subscribe((response: any) => {
          this.toastr.success('Badge ajouté au quiz', 'Ajout');
        });
    }
  }

  onQuestionsSelected(selectedQuestions: any) {
    this.selectedQuestions = selectedQuestions;
  }

  onCategorySelected(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
  }

  addSelectedQuestionsToQuiz(selectedCategory: string) {
    if (this.selectedQuiz && this.selectedQuestions.length > 0) {
      this.quizService
        .addQuestionByCategoryToQuiz(this.selectedQuiz.id, selectedCategory)
        .subscribe((response: any) => {
          this.toastr.success('Questions ajoutées au quiz', 'Ajout');
        });
    }
  }
}
