import 'quill-emoji/dist/quill-emoji.js';
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.development';
import Quill from 'quill';

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.userConnected = this.authService.getUserConnected();
    this.authService.getUserConnected().subscribe((user: any) => {
      this.userConnected = user;
      this.userId = user?.userId;
    });
  }

  ngOnInit(): void {
    // Initialize code here if needed
  }

  ngAfterViewInit() {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['emoji', 'link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      ['clean'],
      [{ size: ['small', false, 'large', 'huge'] }],
    ];


    this.quill = new Quill('#editor', {
      modules: {
          toolbar: toolbarOptions,
          'emoji-toolbar': true,
          'emoji-textarea': true,
          'emoji-shortname': true,
      },
      theme: 'snow',
  });

    // const emojiButton: any = this.quill.getModule('emoji-toolbar'); // Type should be defined
    // emojiButton.initToolbar();
  }

  createQuiz(): void {
    const descriptionText = this.quill.root.innerHTML;

    const userId = this.userConnected.id;
    const url = environment.apiUrl + `/promotions/${userId}`;

    const data = {
      description: descriptionText,
      name: this.textValue,
      picture: this.picture,
      tag: this.tag,
      type: this.type,
      difficulty: this.difficulty,
    };

    // Use the HttpClient to send a POST request with the 'data' to the 'url'
    // Uncomment and modify this code based on your API endpoint and data structure
    // this.http.post(url, data).subscribe(
    //   (response: any) => {
    //     const createdPromotionId = response.id;
    //     localStorage.setItem('createdPromotionId', createdPromotionId);
    //     alert('La promotion est créée avec succès !');
    //     this.createdQuizId = createdPromotionId;
    //     this.showModal = true;
    //   },
    //   (error) => {
    //     console.error('Failed to create promotion', error);
    //   }
    // );
  }
}
