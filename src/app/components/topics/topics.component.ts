import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TopicsService } from 'src/app/services/topics.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  userId: string = '';
  topics: any[] = [];
  topicId: string = '';
  authorId: string = '';
  receiverId: string = '';
  answers: any[] = [];
  existingAnswers: any[] = [];
  selectedTopic: any;
  topic: any;
  answer: any;
  userConnected: any;
  editTopic: boolean = false;
  topicMessage: string = '';
  editAnswer: boolean = false;
  answerMessage: string = '';

  constructor (
    private authService: AuthService,
    private topicsService: TopicsService,
    private userService: UserService,
    private toastr: ToastrService
  ) { this.selectedTopic = null; }

  ngOnInit(): void {
    this.topicsService.getTopics().subscribe((topics: any) => {
      this.topics = topics;
      console.log(this.topics);

      // Pour chaque sujet, récupérez le nom de l'auteur
      this.topics.forEach((topic: any) => {
        this.userService.getUserName(topic.authorId).subscribe((authorName: string) => {
          topic.authorName = authorName;
          console.log("Author name", authorName);
        });
      });

      // Pour chaque réponse, récupérez le nom de l'auteur
      this.topicsService.getAnswers().subscribe((answers: any) => {
        this.existingAnswers.forEach((answer: any) => {
          this.userService.getUserById(answer.authorId).subscribe((author: User) => {
            answer.authorId = author;
            console.log("Author", author);

            this.userService.getUserName(answer.authorId).subscribe((authorName: string) => {
              answer.authorName = authorName;
              console.log("Author name for answers", authorName);
            });
          });
        }
        );
      });
    });





    // Rest of your code...

    // this.topics.forEach((topic: any) => {
    //   this.userService.getUserAvatarForComment(topic.author).subscribe((avatarBlob: Blob) => {
    //     const avatarUrl = URL.createObjectURL(avatarBlob);
    //     topic.authorAvatar = avatarUrl;
    //   });
    // });




    this.authService.getUserConnected().subscribe((user: any) => {
      this.userConnected = user;
      console.log("User connected", this.userConnected);
    });
  }


  getTopicById(id: string) {
    this.topicsService.getTopicById(id).subscribe((topic: any) => {
      this.selectedTopic = topic;
      console.log(this.selectedTopic);
      this.getAnswersByTopic(this.selectedTopic.id);

    });
  }

  onEditTopic() {
    this.editTopic = !this.editTopic;
  }

  getAnswersByTopic(topicId: any) {
    console.log("For getting answers by topic", topicId);
    this.topicsService.getAnswersByTopicId(topicId).subscribe((answers: any) => {
      this.existingAnswers = answers;
      this.existingAnswers = answers.filter((answer: any) => answer.topicId === topicId);
      this.existingAnswers.sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      );
      console.log("Les réponses", this.existingAnswers);
      setTimeout(() => {
        this.goBottom();
      }, 500);
    });
  }

  createTopic() {
    if (this.userConnected) {
      const authorTopicId = this.userConnected.id;
      console.log("Topic", this.topic);
      const data = {
        message: this.topicMessage,
      };
      console.log("Data", data);

      this.topicsService.postTopic(data, authorTopicId).subscribe((topic: any) => {
        this.topic = topic;
        this.toastr.success("Topic créé avec succès", "Succès");
        this.ngOnInit();
        this.topicMessage = "";
        this.editTopic = false;
      });
    }
  }

  toggleEdit() {
    this.editTopic = !this.editTopic;

  }

  createAnswer() {
    if (this.userConnected) {
      const authorAnswerId = this.userConnected.id;
      console.log("Answer", this.answer);
      const data = {
        answer: this.answerMessage,
      };
      console.log("Data", data);

      this.topicsService.postAnswer(data, this.selectedTopic.id, authorAnswerId).subscribe((answer: any) => {
        this.answer = answer;
        this.toastr.success("Réponse créée avec succès", "Succès");
        this.answerMessage = "";
        this.editAnswer = false;

      });
    }
  }


  toggleAnswer() {
    this.editAnswer = !this.editAnswer;
    console.log('editAnswer:', this.editAnswer);

  }
  goBottom() {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
}
