import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  articles: any[] = [];
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
}
