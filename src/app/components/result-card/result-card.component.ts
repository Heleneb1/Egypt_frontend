import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {
  @Input() filteredArticle: Article[] = [];
  selectedArticle: Article | null = null;
  showDetails = false;

  constructor(private router: Router) {}

  toggleDetails(selectedArticle: Article) {
    if (this.selectedArticle === selectedArticle) {
      this.selectedArticle = null;
    } else {
      this.selectedArticle = selectedArticle;
    }
    this.showDetails = !!this.selectedArticle; 
  }

  goToArticleDetails() {
    if (this.selectedArticle) {
      // Vous pouvez utiliser le router pour naviguer vers la page des détails de l'article ici.
      // Exemple : this.router.navigate(['/article', this.selectedArticle.id]);
    }
  }
}

//card result for SearchComponent
//   @Output() favoriteAdded: EventEmitter<Museums> = new EventEmitter<Museums>();
//   @Output() historyAdded: EventEmitter<Museums> = new EventEmitter<Museums>();

//   @Input() filteredMuseums: Museums[] = [];
//   @Input() labelMuseums: Museums[] = [];
//   @Input() HandiLabelMuseums: Museums[] = [];
//   @Input() themeMuseums: Museums[] = [];
//   @Input() item!: string;

//   selectedMuseum: Museums | null = null;
//   showDetails = false;
//   favoriteMuseum!: Museums;
//   MuseuminHistory!: Museums;
//   session!: string;
//   dataList: object[] = [];
//   historyList: object[] = [];
//   isOpen = false;

//   toggleDetails(selectedMuseum: Museums) {
//     if (this.selectedMuseum === selectedMuseum) {
//       this.selectedMuseum = null;
//     } else {
//       this.selectedMuseum = selectedMuseum;
//     }
//     return this.selectedMuseum;
//   }

//   addFavorite(favori: Museums): void {
//     const sessionData: string | null = localStorage.getItem("session");
//     if (sessionData) {
//       this.dataList = JSON.parse(sessionData);
//       const isFavoriteInList = this.dataList.some((item: any) => {
//         return item.recordid === favori.recordid;
//       });
//       if (isFavoriteInList) {
//         this.toastr.error("Ce musée est déjà dans votre liste de favoris");

//         return;
//       }
//     }
//     if (favori.favorite !== favori.favorite) {
//       this.favoriteMuseum;
//     } else {
//       if (this.favoriteMuseum) {
//         this.favoriteMuseum.favorite = false;
//       }
//       this.favoriteMuseum = favori;
//       this.favoriteAdded.emit(this.favoriteMuseum);
//       this.saveFavoriteData(this.favoriteMuseum);
//       this.goToFavorites();
//     }
//   }
//   goToFavorites() {
//     this.router.navigate(["/favorite"]);
//   }

//   addHistory(historyMuseums: Museums): void {
//     const historyData: string | null = localStorage.getItem("history");

//     if (historyData) {
//       this.historyList = JSON.parse(historyData);
//       const isHistoryInList = this.historyList.some((item: any) => {
//         return item?.recordid === historyMuseums.recordid;
//       });

//       if (isHistoryInList) {
//         this.toastr.error("Ce musée est déjà dans votre historique");

//         return;
//       }
//     }
//     if (!historyMuseums.visited) {
//       historyMuseums.visited = false;
//     }
//     this.MuseuminHistory = historyMuseums;
//     this.historyAdded.emit(this.MuseuminHistory);
//     this.saveHistoryData(this.MuseuminHistory);
//     this.goToHistory();
//   }

//   goToHistory() {
//     this.router.navigate(["/history"]);
//   }
//   saveFavoriteData(favori: Museums) {
//     if (!this.dataList) {
//       this.dataList = [];
//     }

//     const sessionData: string | null = localStorage.getItem("session");
//     if (sessionData) {
//       this.dataList = JSON.parse(sessionData);
//     }

//     this.dataList.push({
//       id: favori.identifiant,
//       nom_offre: favori.nom_offre,
//       commune: favori.commune,
//       site_web: favori.site_web,
//       recordid: favori.recordid,
//     });

//     localStorage.setItem("session", JSON.stringify(this.dataList));
//   }
//   saveHistoryData(historyMuseums: Museums) {
//     if (!this.historyList) {
//       this.historyList = [];
//     }

//     const historyData: string | null = localStorage.getItem("history");
//     if (historyData) {
//       this.historyList = JSON.parse(historyData);
//     }

//     this.historyList.push(historyMuseums);
//     localStorage.setItem("history", JSON.stringify(this.historyList));
//   }

//   toggleFavorite(museum: Museums) {
//     this.addFavorite(museum);
//   }

//   toggleHistory(visited: Museums) {
//     this.addHistory(visited);
//   }
// }