import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  articles: any[] = [];
  articleSearch = '';
  articleData!: Article[];
  author!: string;
  tag!: string;
  title!: string;
  constructor(private articlesService: ArticlesService) {}
  getArticles(): void {
    this.articlesService.getArticles().subscribe((articles: any) => {
      this.articles = articles;
    });
  }
  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((articles: any) => {
      this.articles = articles;
    });
  }

  onAuthorSearchChange() {
    this.articlesService.getArticlesByAuthor(this.author).subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
  }
  onTagSearchChange() {
    this.articlesService.getArticlesByTag(this.tag).subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.articles.includes(this.tag);
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
  }
  onTitleSearchChange() {
    this.articlesService.getArticlesByTitle(this.title).subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
  }
}
