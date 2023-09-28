import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BadgesService {


  private badgeDataUrl = environment.apiUrl + '/badges';
  // private questionDataUrl = environment.apiUrl + '/badges';

  questionTitles: any = [];
  constructor(private httpClient: HttpClient) { }

  getBadges() {
    return this.httpClient.get(this.badgeDataUrl);
  }

  getBadgesById(badgeId: string) {
    return this.httpClient.get(`${this.badgeDataUrl}/${badgeId}`);
  }
  // getBadgesQuestions(badgeId: string): Observable<any[]> {
  //   const url = `${this.badgeDataUrl}/${badgeId}/questions`;
  //   return this.httpClient.get<any[]>(url);
  // }

  // getQuestionByTitle(questionId: string): Observable<string> {
  //   console.log(questionId);

  //   return this.getQuestionById(questionId).pipe(map((question: any) => `${question.question_title} `));

  // }
  // getQuestionById(questionId: string) {
  //   return this.httpClient.get(`${this.questionDataUrl}/${questionId}`);
  // }
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

  // insertBadges(data: any) {
  //     this.badgeDataUrl + '/Badges';
  //     return this.httpClient.post(this.badgeDataUrl + '/Badgeszes', data);
  // }

}
