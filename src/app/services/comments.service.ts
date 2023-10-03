import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentsDataUrl = environment.apiUrl + '/comments';

  constructor (private httpClient: HttpClient) { }

  getComments() {
    return this.httpClient.get(this.commentsDataUrl);
  }

  getCommentsByArticle(article: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `${this.commentsDataUrl}?article=${article}`
    );
  }
  //  @GetMapping("/byArticle/{aticleId}/")
  getCommentsByArticleId(articleId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `${this.commentsDataUrl}/byArticle/${articleId}`
    );
  }
}
