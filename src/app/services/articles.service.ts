import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Article } from '../models/article';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articlesDataUrl = environment.apiUrl + '/articles';

  constructor(private httpClient: HttpClient) { }
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
  getUniqueTags(): Observable<string[]> {
    return this.httpClient.get<Article[]>(this.articlesDataUrl).pipe(
      map((articles: Article[]) => {
        const uniqueTag = new Set<string>();

        articles.forEach((article: Article) => {
          const individualTag = article.tag.split(',').map(t => t.trim());
          individualTag.forEach(t => uniqueTag.add(t));
        });

        // Convertion du Set en tableau
        return Array.from(uniqueTag);
      })
    );
  }
  getTitle(): Observable<string[]> {
    return this.httpClient.get<Article[]>(this.articlesDataUrl).pipe(
      map((articles: Article[]) => {
        const uniqueTitle = new Set<string>();

        articles.forEach((article: Article) => {
          const title = article.title.split(',').map(t => t.trim());
          title.forEach(t => uniqueTitle.add(t));
        });

        // Convertion du Set en tableau
        return Array.from(uniqueTitle);
      })
    );
  }
  getUniqueAuthors(): Observable<string[]> {
    return this.httpClient.get<Article[]>(this.articlesDataUrl).pipe(
      map((articles: Article[]) => {
        const uniqueAuthor = new Set<string>();
  
        articles.forEach((article: Article) => {
          if (article.author) {
            const individualAuthor = article.author.split(',').map(t => t.trim());
            individualAuthor.forEach(t => uniqueAuthor.add(t));
          }
        });
  
        // Conversion du Set en tableau
        return Array.from(uniqueAuthor);
      })
    );
  }
  // getArticlesByAuthor(author: string): Observable<Article[]> {
  //   return this.httpClient.get<Article[]>(
  //     `${this.articlesDataUrl}/byAuthor/${author}`
  //   );
  // }

  getArticlesByAuthorTitleTag(articleAuthor?: string, articleTitle?: string, articleTag?: string): Observable<Article[]> {
    // Construct the URL based on the provided parameters
    let searchUrl = this.articlesDataUrl + '/search';
  
    // Build the query parameters
    const queryParams = [];
    if (articleAuthor) {
      queryParams.push(`author=${encodeURIComponent(articleAuthor)}`);
    }
    if (articleTitle) {
      queryParams.push(`title=${encodeURIComponent(articleTitle)}`);
    }
    if (articleTag) {
      queryParams.push(`tag=${encodeURIComponent(articleTag)}`);
    }
  
    // Add the query parameters to the URL if any are provided
    if (queryParams.length > 0) {
      searchUrl += '?' + queryParams.join('&');
    }
  
    // Specify the response type as Article[]
    return this.httpClient.get<Article[]>(searchUrl);
  }
}  

