import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
}
