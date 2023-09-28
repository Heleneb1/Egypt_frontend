import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles-carousel',
  templateUrl: './articles-carousel.component.html',
  styleUrls: ['./articles-carousel.component.scss']
})
export class ArticlesCarouselComponent implements OnInit {
  @Input() articles: any[] = [];
  currentIndex = 0;
  leftIndex: number;
  rightIndex!: number;
  article!: Article;
  defaultImage: string = 'assets/images/Gizeah.jpg';



  constructor(private articlesService: ArticlesService, private router: Router) {
    this.leftIndex = this.articles.length - 1;
  }

  ngOnInit(): void {
    this.showArticles();
  }

  showArticles() {
    this.articlesService.getArticles().subscribe((articles: any) => {
      this.articles = articles;
      this.updateIndexes();
      console.log("articles", articles);

    });
  }

  nextArticle() {
    this.currentIndex = (this.currentIndex + 1) % this.articles.length;
    this.updateIndexes();


  }

  prevArticle() {
    this.currentIndex = (this.currentIndex - 1 + this.articles.length) % this.articles.length;
    this.updateIndexes();


  }

  updateIndexes() {
    this.leftIndex = (this.currentIndex - 1 + this.articles.length) % this.articles.length;
    this.rightIndex = (this.currentIndex + 1) % this.articles.length;
  }
}
