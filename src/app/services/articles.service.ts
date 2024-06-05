import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Article } from '../models/article';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articlesDataUrl = environment.apiUrl + '/articles';

  addRating(articleId: string, userRating: number) {
    const url = `${this.articlesDataUrl}/${articleId}/add-rating`;
    this.httpClient.put<any>(url, { rating: userRating }).subscribe(
      (updatedArticle) => {},
      (error) => {
        console.error('Erreur lors de la mise à jour du quiz :', error);
      }
    );
  }

  //TODO: convention de nommage sur les observables : https://angular.io/guide/rx-library#naming-conventions-for-observables

  constructor(private httpClient: HttpClient) {}
  getArticles$(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.articlesDataUrl}`);
  }
  getArticleById(id: string) {
    return this.httpClient.get(`${this.articlesDataUrl}/${id}`);
  }
  getArticleContent(articleId: string): any {
    return this.getArticleById(articleId).pipe(
      map((article: any) => {
        return {
          title: article.title,
          id: article.id,
          archive: article.archive,
          author: article.author,
          content: article.content,
          rating: article.rating,
        };
      })
    );
  }
  getArticleId$(id: number): Observable<Article> {
    return this.httpClient.get<Article>(`${this.articlesDataUrl}/${id}`);
  }

  getArticlesByAuthor$(author: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(
      `${this.articlesDataUrl}/byAuthor/${author}`
    );
  }
  getArticlesByTag$(tag: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(
      `${this.articlesDataUrl}/byTag/${tag}`
    );
  }
  getArticlesByTitle$(title: string): Observable<Article[]> {
    return this.httpClient.get<Article[]>(
      `${this.articlesDataUrl}/byTitle/${title}`
    );
  }
  getUniqueTags$(): Observable<string[]> {
    return this.httpClient.get<Article[]>(this.articlesDataUrl).pipe(
      map((articles: Article[]) => {
        const uniqueTag = new Set<string>();

        articles.forEach((article: Article) => {
          const individualTag = article.tag.split(',').map((t) => t.trim());
          individualTag.forEach((t) => uniqueTag.add(t));
        });

        // Convertion du Set en tableau
        return Array.from(uniqueTag);
      })
    );
  }
  getTitle$(): Observable<string[]> {
    return this.httpClient.get<Article[]>(this.articlesDataUrl).pipe(
      map((articles: Article[]) => {
        const uniqueTitle = new Set<string>();

        articles.forEach((article: Article) => {
          const title = article.title.split(',').map((t) => t.trim());
          title.forEach((t) => uniqueTitle.add(t));
        });

        // Convertion du Set en tableau
        return Array.from(uniqueTitle);
      })
    );
  }
  getUniqueAuthors$(): Observable<string[]> {
    return this.httpClient.get<Article[]>(this.articlesDataUrl).pipe(
      map((articles: Article[]) => {
        const uniqueAuthor = new Set<string>();

        articles.forEach((article: Article) => {
          if (article.author) {
            const individualAuthor = article.author
              .split(',')
              .map((t) => t.trim());
            individualAuthor.forEach((t) => uniqueAuthor.add(t));
          }
        });

        // Conversion du Set en tableau
        return Array.from(uniqueAuthor);
      })
    );
  }
  getArticlesByAuthorTitleTag$(
    articleAuthor?: string,
    articleTitle?: string,
    articleTag?: string
  ): Observable<Article[]> {
    let searchUrl = this.articlesDataUrl;
    if (articleTitle) {
      searchUrl += '/search/' + encodeURIComponent(articleTitle);
    } else if (articleTitle) {
      searchUrl += '/search/' + encodeURIComponent(articleTitle);
    } else if (articleTag) {
      searchUrl += '/search/' + encodeURIComponent(articleTag);
    }
    return this.httpClient.get<Article[]>(searchUrl);
  }
}
