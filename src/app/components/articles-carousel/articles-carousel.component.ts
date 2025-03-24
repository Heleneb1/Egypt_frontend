import { Component, Input, OnInit } from '@angular/core';
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
  leftIndex!: number;
  rightIndex!: number;
  article!: Article;
  visibleArticle!: Article;
  defaultImage: string = 'assets/images/Gizeah.jpg';

  constructor(private articlesService: ArticlesService, private router: Router) {

  }

  ngOnInit(): void {
    this.showArticles();
    this.currentIndex = this.articles.length;
    this.updateIndexes();


  }
  showArticles() {
    this.articlesService.getArticles$().subscribe((articles: any) => {
      this.articles = articles;
      this.currentIndex = this.articles.length;
      this.updateIndexes();
    });
  }

  updateIndexes() {
    this.currentIndex = (this.currentIndex + this.articles.length) % this.articles.length;
    this.leftIndex = (this.currentIndex - 1 + this.articles.length) % this.articles.length;
    this.rightIndex = (this.currentIndex + 1 + this.articles.length) % this.articles.length;
    this.visibleArticle = this.articles[this.currentIndex];

  }
  updateArticles(newArticles: any[]) {
    this.articles = newArticles;
    this.currentIndex = 0;
    this.updateIndexes();
  }

  nextArticle() {
    if (this.articles.length === 0) return;
    console.log('Next article clicked');
    console.log('Current index before:', this.currentIndex);
    this.currentIndex = (this.currentIndex + 1) % this.articles.length;
    console.log('Current index after:', this.currentIndex);
    this.updateIndexes();
  }

  prevArticle() {
    if (this.articles.length === 0) return;
    console.log('Previous article clicked');
    console.log('Current index before:', this.currentIndex);
    this.currentIndex = (this.currentIndex - 1 + this.articles.length) % this.articles.length;
    console.log('Current index after:', this.currentIndex);
    this.updateIndexes();
  }

}

