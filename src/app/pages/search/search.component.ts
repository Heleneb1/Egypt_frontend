import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Article } from '../../models/article';

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
  authors: string[] = [];
  tag!: string;
  tags: string[] = [];
  title!: string;
  filteredArticles: Article[] = [];
  selectedTag: string = '';
  articleTag="";
  selectedAuthor="";
  articleTitle="";
  tagOptions!: string[];
  titleOptions!: string[];
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
    this.loadTags();
    this.loadTitle();
  }

  onAuthorSearchChange() {
    this.articlesService.getArticlesByAuthor(this.selectedAuthor).subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      },
      (error) => {
        console.error("Une erreur s'est produite :", error);
      }
    );
  }
  loadTags() {
    // Appelez votre service pour récupérer les options du menu déroulant ici
    this.articlesService.getUniqueTags().subscribe(
      (tags: string[]) => {
        this.tagOptions = tags;
      },
      (error) => {
        console.error("Une erreur s'est produite lors du chargement des tags :", error);
      }
    );
  }

  onTagSearchChange() {
    // Utilisez this.selectedTag pour accéder à la valeur sélectionnée par l'utilisateur
    console.log('Tag sélectionné :', this.selectedTag);

    // Appelez votre service pour récupérer les articles par tag ici
    this.articlesService.getArticlesByTag(this.selectedTag).subscribe(
      (articles: Article[]) => {
        // Mettez à jour la liste des articles en fonction du tag sélectionné
        this.articles = articles;
      },
      (error) => {
        console.error("Une erreur s'est produite lors de la recherche d'articles par tag :", error);
      }
    );
  }

  loadTitle() {
    // Appelez votre service pour récupérer les options du menu déroulant ici
    this.articlesService.getTitle().subscribe(
      (titles: string[]) => {
        this.titleOptions = titles;
      },
      (error) => {
        console.error("Une erreur s'est produite lors du chargement des titres :", error);
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
// getMuseumByLabel(label: string): Museums[] {
//   const filteredMuseumLabel: Museums[] = [];

//   this.museumData.forEach((museumData) => {
//     const museum: Museums = museumData.fields;
//     museum.recordid = museumData.recordid;
//     if (museum.labels && museum.labels.includes(label)) {
//       filteredMuseumLabel.push(museum);
//     }
//   });
//   this.animate = true;
//   setTimeout(() => {
//     this.animate = false;
//   }, 5000);
//   return filteredMuseumLabel;
// }

// onLabelChange() {
//   this.resetOtherFilters("label");
//   this.selectedLabel = this.museumLabel;
//   this.labelMuseums = this.getMuseumByLabel(this.museumLabel).slice(0, 2);
//   this.showSeeMore = true;
// }
