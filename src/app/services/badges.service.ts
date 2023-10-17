import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {


  private badgeDataUrl = environment.apiUrl + '/badges';

  questionTitles: any = [];
  constructor (private httpClient: HttpClient) { }

  getBadges() {
    return this.httpClient.get(this.badgeDataUrl);
  }

  getBadgesById(badgeId: string) {
    return this.httpClient.get(`${this.badgeDataUrl}/${badgeId}`);
  }
  getBadgeContent(badgeId: string): Observable<any> {
    return this.getBadgesById(badgeId).pipe(
      map((badge: any) => {
        return {
          id: badge.id,
          description: badge.description,
          image: badge.image,
          name: badge.name,
        };
      })
    );
  }
  deleteBadge(id: string) {
    return this.httpClient.delete(`${this.badgeDataUrl}/${id}`);
  }
  // addRating(promotionId: string, userRating: number, authorId: string) {
  //     const url = environment.apiUrl + `/promotions/${promotionId}/users/${authorId}`;

  //     this.httpClient.put<any>(url, { rating: userRating }).subscribe(
  //       updatedPromotion => {
  //         console.log('Promotion mise à jour avec le vote :', updatedPromotion);
  //       },
  //       error => {
  //         console.error('Erreur lors de la mise à jour de la promotion :', error);
  //       }
  //     );
  //   }


}
