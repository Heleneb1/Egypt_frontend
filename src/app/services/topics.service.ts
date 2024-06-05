import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  private topicsUrl = environment.apiUrl + '/topics';
  private answersUrl = environment.apiUrl + '/answers';

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}
  getTopics() {
    return this.httpClient.get(this.topicsUrl);
  }
  getTopicsByTag(tag: string) {
    return this.httpClient.get(`${this.topicsUrl}/byTag/${tag}`);
  }
  getTopicById(id: string) {
    return this.httpClient.get(`${this.topicsUrl}/${id}`);
  }
  postTopic(topic: any, authorId: string) {
    return this.httpClient.post(`${this.topicsUrl}/${authorId}/create`, topic);
  }
  getAnswers() {
    return this.httpClient.get(this.answersUrl);
  }

  getAnswerById(id: string) {
    return this.httpClient.get(`${this.answersUrl}/${id}`);
  }
  postAnswer(answer: any, topicId: string, authorId: string) {
    return this.httpClient.post(
      `${this.answersUrl}/${topicId}/${authorId}/create-answers`,
      answer
    );
  }
  getAnswersByTopicId(topicId: string) {
    return this.httpClient.get(`${this.answersUrl}/topics/${topicId}`);
  }
}
