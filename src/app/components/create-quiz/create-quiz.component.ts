import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.development';
import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements AfterViewInit, OnInit {

  showModal = false;
  quill!: Quill;
  textValue: string = '';
  description: string = '';
  picture: string = '';
  tag: string = '';
  type: string = '';
  difficulty: string = '';
  createdQuizId: string = '';
  userConnected: any; // Type should be defined
  userId: string = '';
  isArchived: boolean = true;

  constructor (
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.userConnected = this.authService.getUserConnected();
    this.authService.getUserConnected().subscribe((user: any) => {
      this.userConnected = user;
      this.userId = user?.userId;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'script', 'header',
        'indent', 'list', 'direction', 'align', 'clean'],
      ['emoji', 'link', 'image', 'video', 'formula', 'code', 'table'],
      [{ color: [] }, { background: [] }],
      ['clean'],
      [{ size: ['small', false, 'large', 'huge'] }],

    ];


    this.quill = new Quill('#editor', {
      modules: {
        toolbar: toolbarOptions,
        // 'emoji-toolbar': true,
        // 'emoji-textarea': true,
        // 'emoji-shortname': true,
      },
      theme: 'snow',
    });
    // const emojiButton: any = this.quill.getModule('emoji-toolbar'); // Type should be defined
    // emojiButton.initToolbar();
  }

  createQuiz(): void {
    const descriptionText = this.quill.root.innerHTML;
    const userId = this.userConnected.id;
    const url = environment.apiUrl + `/quizzes/create/${userId}`;
    console.log(url);

    const data = {
      content: descriptionText,
      title: this.textValue,
      picture: this.picture,
      tag: this.tag,
      difficulty: this.difficulty,
      archive: this.isArchived,
    };

    this.http.post(url, data).subscribe(

      (response: any) => {
        console.log('Quiz created', response);
        console.log(data);
        this.toastr.success('Le quiz est créé avec succès !');

        // alert('Le quiz est créé avec succès !');
      },
      (error) => {
        console.error('Failed to create quiz', error);
        console.log(data);

      }
    );
  }
}


