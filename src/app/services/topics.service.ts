import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  private topicsUrl = environment.apiUrl + '/topics';
  private answersUrl = environment.apiUrl + '/answers';


  constructor (private authService: AuthService, private httpClient: HttpClient) { }
  getTopics() {
    return this.httpClient.get(this.topicsUrl);
  }
  getTopicById(id: string) {
    return this.httpClient.get(`${this.topicsUrl}/${id}`);
  }
  // @PostMapping("/{authorId}/{receiverId}/create")
  postTopic(topic: any, authorId: string) {
    return this.httpClient.post(`${this.topicsUrl}/${authorId}/create`, topic);
  }
  getAnswers() {
    return this.httpClient.get(this.answersUrl);
  }

  getAnswerById(id: string) {
    return this.httpClient.get(`${this.answersUrl}/${id}`);
  }
  //@PostMapping("/{topicId}/{authorId}/create-answers")
  postAnswer(answer: any, topicId: string, authorId: string) {
    return this.httpClient.post(`${this.answersUrl}/${topicId}/${authorId}/create-answers`, answer);

  }
  // @GetMapping("/{authorId}/{topicId}")
  getAnswersByTopicId(topicId: string) {
    console.log(`${this.answersUrl}/topics/${topicId}`);

    return this.httpClient.get(`${this.answersUrl}/topics/${topicId}`);
  }
}
