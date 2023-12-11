import { Injectable } from '@angular/core';
import { ArticlesService } from './articles.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private dataUrl = environment.apiUrl;

  constructor (private articleservice: ArticlesService, private userService: UserService,
    private httpClient: HttpClient) { }
  getArticles() {
    return this.articleservice.getArticles$();
  }
  getArticleById(id: string) {
    return this.articleservice.getArticleById(id);
  }
  deleteArticle(id: string) {
    return this.httpClient.delete(`${this.dataUrl}/articles/${id}`);
  }
  updateArticle$(id: string, updatedArticle: Article): Observable<Article> {
    const url = `${this.dataUrl}/articles/${id}`;
    return this.httpClient.put<Article>(url, updatedArticle);
  }
  getUsers() {
    return this.userService.getUsers();
  }
  getImage(image: string) {
    return this.httpClient.get(`${this.dataUrl}/images`);
  }
  addNewArticle$(article: Article): Observable<Article> {

    return this.httpClient.post<Article>(`${this.dataUrl}/articles/create`, article);
  }
}
