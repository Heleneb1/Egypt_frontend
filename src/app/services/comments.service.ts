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
  updateComment(id: string, comment: any) {
    console.log('Comment to update:', id, comment);

    const url = `${this.commentsDataUrl}/${id}`;
    return this.httpClient.put(url, comment);
  }


  updateCommentByArticleId(id: string, authorId: string, comment: any) {
    console.log('Comment to update:', id);
    console.log('Comment to update:', authorId);
    console.log('Comment to update:', comment);

    const updateUrl = `${this.commentsDataUrl}/${id}/${authorId}/update`;
    console.log('URL:', updateUrl);
    console.log(this.httpClient.put(updateUrl, comment));


    return this.httpClient.put(updateUrl, comment);
  }

  // updateCommentByArticleId(id: string, comment: any, articleId: string, authorId: string): Observable<any> {
  //   const url = `${this.commentsDataUrl}/${id}/${authorId}/${articleId}/update`;
  //   console.log('URL:', url);

  //   const updatedComment = {
  //     id: id,
  //     content: comment.content,
  //     creationDate: comment.creationDate,
  //     archive: comment.archive,
  //     author: authorId,
  //     article: articleId
  //   };

  //   return this.httpClient.put(url, updatedComment);
  // }


  deleteCommentByAuthor(commentId: string, authorId: string) {
    console.log('Comment to delete:', commentId, authorId);

    const url = `${this.commentsDataUrl}/${commentId}/${authorId}`;
    return this.httpClient.delete(url);
  }
  deleteComment(id: string, content: string) {
    console.log('Comment to delete:', id);

    const url = `${this.commentsDataUrl}/${id}`;
    return this.httpClient.delete(url, { body: { content } });
  }


}
