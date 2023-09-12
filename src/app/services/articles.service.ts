import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Article } from '../models/Article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articlesDataUrl = environment.apiUrl + '/articles';

  constructor(private httpClient: HttpClient) {}
  getArticles() {
    return this.httpClient.get(this.articlesDataUrl);
  }
  getArticleById(id: string) {
    return this.httpClient.get(this.articlesDataUrl + '/' + id);
  }
  getArticlesByAuthor(author: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(
      `${this.articlesDataUrl}/byAuthor/${author}`
    );
  }
  getArticlesByTag(tag: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(
      `${this.articlesDataUrl}/byTag/${tag}`
    );
  }
  getArticlesByTitle(title: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(
      `${this.articlesDataUrl}/byTitle/${title}`
    );
  }
}
