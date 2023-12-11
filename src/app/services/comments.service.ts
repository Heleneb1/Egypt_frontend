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

  getCommentsByArticleId(articleId: string): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(
      `${this.commentsDataUrl}/byArticle/${articleId}`
    );
  }
  updateComment(id: string, comment: any) {
    const url = `${this.commentsDataUrl}/${id}`;
    return this.httpClient.put(url, comment);
  }

  updateCommentByArticleId(id: string, comment: any): Observable<any> {
    const updateUrl = `${this.commentsDataUrl}/${id}/archive`;
    return this.httpClient.put(updateUrl, comment);
  }

  deleteCommentByAuthor(id: string, authorId: string) {
    const url = `${this.commentsDataUrl}/${id}/${authorId}`;
    return this.httpClient.delete(url);
  }

  deleteComment(id: string, content: string) {
    const url = `${this.commentsDataUrl}/${id}`;

    return this.httpClient.delete(url, { body: { content } });
  }


}
