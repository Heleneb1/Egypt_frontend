import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../models/article';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchTerms = new Subject<string>();
  articles$!: Observable<Article[]>;
  articles: Article[] = [];
  searchQuery: string = '';
  animateCard = false;
  selectedTag: string[] = [];
  selectedTitle: string[] = [];
  selectedAuthor: string[] = [];
  articleTag = '';
  articleTitle = '';
  tagOptions!: string[];
  titleOptions!: string[];
  articleAuthor = '';
  authorOptions!: string[];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.loadTags();
    this.loadTitle();
    this.loadAuthors();

    this.articles$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.articlesService.getArticlesByAuthorTitleTag$(term)
      )
    );

    this.articles$.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        // Ajoute ce log pour vérifier
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );

  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  searchArticles() {
    this.resetOtherFilters('tag');
    this.resetOtherFilters('title');
    this.resetOtherFilters('author');
    this.searchTerms.next(this.searchQuery);
    this.searchQuery = '';
  }

  onAuthorSearchChange(selectedAuthor: string) {
    this.resetOtherFilters('author');
    this.articlesService.getArticlesByAuthor$(selectedAuthor).subscribe(
      (articles: Article[]) => {
        this.articles = articles;

      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
    this.animateCard = true;
    setTimeout(() => {
      this.animateCard = false;
    }, 5000);
  }

  onTagSearchChange(selectedTag: string) {
    this.resetOtherFilters('tag');
    this.articlesService.getArticlesByTag$(selectedTag).subscribe(
      (articles: Article[]) => {
        this.articles = articles;

      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors de la recherche d'articles par tag :",
          error
        );
      }
    );
    this.animateCard = true;
    setTimeout(() => {
      this.animateCard = false;
    }, 5000);
  }

  loadTitle() {
    this.articlesService.getTitle$().subscribe(
      (titles: string[]) => {
        this.titleOptions = titles;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors du chargement des titres :",
          error
        );
      }
    );
  }

  loadAuthors() {
    this.articlesService.getUniqueAuthors$().subscribe(
      (authors: string[]) => {
        this.authorOptions = authors;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors du chargement des auteurs :",
          error
        );
      }
    );
  }

  loadTags() {
    this.articlesService.getUniqueTags$().subscribe(
      (tags: string[]) => {
        this.tagOptions = tags;
      },
      (error) => {
        console.error(
          "Une erreur s'est produite lors du chargement des tags :",
          error
        );
      }
    );
  }

  onTitleSearchChange(selectedTitle: string) {
    this.resetOtherFilters('title');
    this.articlesService.getArticlesByTitle$(selectedTitle).subscribe(
      (articles: Article[]) => {
        this.articles = articles;

      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
    this.animateCard = true;
    setTimeout(() => {
      this.animateCard = false;
    }, 5000);
  }

  resetOtherFilters(filter: string) {
    if (filter !== 'tag') {
      this.articleTag = '';
      this.selectedTag = [];
    }
    if (filter !== 'title') {
      this.articleTitle = '';
      this.selectedTitle = [];
    }
    if (filter !== 'author') {
      this.articleAuthor = '';
      this.selectedAuthor = [];
    }
  }
}
